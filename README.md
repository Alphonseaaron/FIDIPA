# FIDIPA Website

## Admin Access Instructions

To access the admin panel:

1. Go to the website URL + '/admin'
2. Use these credentials:
   - Email: admin@fidipa.org
   - Password: (Contact the system administrator for the password)

### Security Notes
- Never share admin credentials
- Always log out after using the admin panel
- Use a secure, private browser session
- Enable 2FA if available

## Development Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with the following:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Database Schema

The application uses Supabase for data storage with the following tables:

- `users`: User authentication and roles
- `blog_posts`: Blog content and metadata
- `programs`: Program information
- `projects`: Project details
- `sections`: Website section content
- `site_config`: Global site configuration