import { db } from './firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { COLLECTIONS } from './firebase';

const defaultSections = [
  {
    id: 'home',
    title: 'Home',
    content: 'Welcome to FIDIPA',
    order: 0,
    image_url: '/image/DSC01363.JPG'
  },
  {
    id: 'about',
    title: 'About Us',
    content: 'FIDIPA is a Non-Governmental Organization registered in Kenya in 2007.',
    order: 1,
    image_url: '/image/SAM_0721.JPG'
  }
];

const defaultBlogPosts = [
  {
    id: 'empowering-communities',
    title: 'Empowering Communities Through Sustainable Development',
    content: 'Our sustainable development initiatives are transforming rural communities...',
    image_url: '/image/DSC05379.JPG',
    author: 'Jayne Wasonga',
    status: 'published',
    created_at: new Date().toISOString()
  }
];

const defaultPrograms = [
  {
    id: 'gender-equality',
    title: 'Gender Equality and Social Inclusion',
    description: 'Empowering communities to address gender inequality...',
    image_url: '/image/DSC05379.JPG',
    created_at: new Date().toISOString()
  }
];

const defaultProjects = [
  {
    id: 'community-training',
    title: 'Community Training Initiative',
    description: 'Implementing comprehensive training programs...',
    image_url: '/image/DSC01363.JPG',
    status: 'ongoing',
    created_at: new Date().toISOString()
  }
];

const defaultSiteConfig = {
  name: 'FIDIPA',
  meta_title: 'FIDIPA - Friendly Integrated Development Initiative in Poverty Alleviation',
  meta_description: 'A holistic peaceful and democratic society with justice for all',
  social_links: {
    facebook: 'https://facebook.com/fidipa',
    twitter: 'https://twitter.com/fidipa'
  }
};

export async function initializeFirestore() {
  try {
    // Check if data already exists
    const sectionsSnapshot = await getDocs(collection(db, COLLECTIONS.SECTIONS));
    if (sectionsSnapshot.empty) {
      // Initialize sections
      for (const section of defaultSections) {
        await setDoc(doc(db, COLLECTIONS.SECTIONS, section.id), section);
      }
      console.log('Sections initialized');
    }

    // Initialize blog posts
    const blogSnapshot = await getDocs(collection(db, COLLECTIONS.BLOG_POSTS));
    if (blogSnapshot.empty) {
      for (const post of defaultBlogPosts) {
        await setDoc(doc(db, COLLECTIONS.BLOG_POSTS, post.id), post);
      }
      console.log('Blog posts initialized');
    }

    // Initialize programs
    const programsSnapshot = await getDocs(collection(db, COLLECTIONS.PROGRAMS));
    if (programsSnapshot.empty) {
      for (const program of defaultPrograms) {
        await setDoc(doc(db, COLLECTIONS.PROGRAMS, program.id), program);
      }
      console.log('Programs initialized');
    }

    // Initialize projects
    const projectsSnapshot = await getDocs(collection(db, COLLECTIONS.PROJECTS));
    if (projectsSnapshot.empty) {
      for (const project of defaultProjects) {
        await setDoc(doc(db, COLLECTIONS.PROJECTS, project.id), project);
      }
      console.log('Projects initialized');
    }

    // Initialize site config
    const configSnapshot = await getDocs(collection(db, COLLECTIONS.SITE_CONFIG));
    if (configSnapshot.empty) {
      await setDoc(doc(db, COLLECTIONS.SITE_CONFIG, 'default'), defaultSiteConfig);
      console.log('Site config initialized');
    }

    console.log('Firestore initialization complete!');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    throw error;
  }
}