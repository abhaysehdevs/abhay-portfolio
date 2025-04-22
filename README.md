# Abhay Sehdev - Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and achievements as a BCA student with expertise in web design and digital marketing.

## Features

- 🎨 Modern and clean design with dark/light mode toggle
- 📱 Fully responsive layout for all devices
- ⚡ Smooth animations and transitions
- 🎯 Interactive project showcase with filtering
- 📊 Animated skill bars
- 📝 Contact form with validation
- 🔍 SEO-friendly structure
- 🌙 Dark mode support

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- AOS (Animate On Scroll) Library

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

4. Visit `http://localhost:8000` in your web browser

## Customization

1. **Content**: Edit the HTML file to update your personal information, projects, and skills.

2. **Styling**: Modify the CSS variables in `styles.css` to change the color scheme:
   ```css
   :root {
       --primary-color: #2563eb;
       --secondary-color: #3b82f6;
       /* ... other variables ... */
   }
   ```

3. **Projects**: Update the project data in `script.js`:
   ```javascript
   const projectData = {
       'project-name': {
           title: 'Project Title',
           description: 'Project Description',
           // ... other details ...
       }
   };
   ```

4. **Images**: Replace the placeholder images in the project cards with your own project screenshots.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]
- Email: [Your Email]

## Acknowledgments

- Font Awesome for icons
- AOS library for scroll animations
- Inter font family by Google Fonts 