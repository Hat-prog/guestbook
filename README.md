# Guestbook
A simple full stack guestbook where people can leave messages for each other. Built with Express, PostgreSQL, and Vite.

# Links
https://guestbook-1-lyil.onrender.com/

## Reflection

### What did I manage to build?
- Made a form that actually works and saves messages to the database
- Set up a GET route to fetch messages and show them on the page
- Set up a POST route so new messages can be sent and stored
- Added some realistic test data directly in Supabase to make it feel real
- Made the site responsive so it works on different screen sizes
- Deployed the client and server separately on Render

### Were there any requirements or goals that you were unable to achieve?
No - all the main requirements are working.

### Difficulties
- Deployment was definitely the trickiest bit. WSL had networking problems, so I couldn't properly test the database locally and had to debug directly on Render.
- Supabase connection didn't work with Render because of IPv4/IPv6 issues. Switching to the session pooler connection fixed it.
