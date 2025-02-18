import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];
type BoardMember = Database['public']['Tables']['board_members']['Row'];

function TeamCarousel({ members }: { members: (TeamMember | BoardMember)[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= members.length ? 0 : prev + itemsPerPage
      );
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => 
        prev - itemsPerPage < 0 ? Math.max(0, members.length - itemsPerPage) : prev - itemsPerPage
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const visibleMembers = members.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="mx-12">
        <div className="flex gap-6 overflow-hidden">
          {visibleMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 min-w-0 bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              style={{ 
                minHeight: '200px',
                maxHeight: '200px',
                width: `${100 / itemsPerPage}%`
              }}
            >
              <div className="flex flex-col h-full items-center text-center">
                {member.photo_url ? (
                  <img 
                    src={member.photo_url} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <User size={24} className="text-primary" />
                  </div>
                )}
                <div className="flex-1 flex flex-col items-center w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-dark-lighter p-2 rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-dark-lighter p-2 rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
}

export default function Team() {
  const [staffMembers, setStaffMembers] = useState<TeamMember[]>([]);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();

    const teamChannel = supabase
      .channel('team-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'team_members' },
        () => fetchTeamMembers()
      )
      .subscribe();

    const boardChannel = supabase
      .channel('board-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'board_members' },
        () => fetchTeamMembers()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(teamChannel);
      supabase.removeChannel(boardChannel);
    };
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const [staffResponse, boardResponse] = await Promise.all([
        supabase
          .from('team_members')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('board_members')
          .select('*')
          .order('sort_order', { ascending: true })
      ]);

      if (staffResponse.error) throw staffResponse.error;
      if (boardResponse.error) throw boardResponse.error;

      setStaffMembers(staffResponse.data || []);
      setBoardMembers(boardResponse.data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="team" className="py-20 bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-16">
            <div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-dark-lighter rounded-lg p-6 h-48"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-dark-lighter rounded-lg p-6 h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated individuals who work tirelessly to make our mission a reality.
          </p>
        </motion.div>

        <div className="space-y-16">
          {staffMembers.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Staff Members</h3>
              <TeamCarousel members={staffMembers} />
            </div>
          )}

          {boardMembers.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Board of Advisory</h3>
              <TeamCarousel members={boardMembers} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}