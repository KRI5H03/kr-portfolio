const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with real projects...')

  await prisma.project.createMany({
    data: [
      {
        title: 'Krish Portfolio',
        description: 'Personal portfolio website showcasing my work and skills',
        longDesc: 'A modern portfolio website built with Next.js, featuring project showcases, skills section, and contact information. Designed with a clean, professional aesthetic.',
        category: 'Portfolio',
        technologies: 'Next.js,React,Tailwind CSS,TypeScript',
        image: '/portfolio.png',
        liveUrl: 'https://krish-poetfolio.vercel.app/', // Add your real URL
        githubUrl: 'https://github.com/KRI5H03/krish-poetfolio',
        isRealProject: false, // Practice project
        order: 1,
      },
      {
        title: 'ZenBrew',
        description: 'Coffee shop website with modern design and animations',
        longDesc: 'A beautifully designed coffee shop website featuring smooth animations, product showcase, and an elegant user interface. Built to provide an immersive browsing experience.',
        category: 'Landing Page',
        technologies: 'Next.js,React,Tailwind CSS,Framer Motion',
        image: '/zenbrew.png',
        liveUrl: 'https://zenbrew-sigma.vercel.app/', // Add your real URL
        githubUrl: 'https://github.com/KRI5H03/zenbrew',
        isRealProject: false, // Practice project
        order: 2,
      },
      {
        title: 'Venoma',
        description: 'Web application with dynamic features and modern UI',
        longDesc: 'A dynamic web application built with modern technologies, focusing on user experience and responsive design. Features interactive elements and clean architecture.',
        category: 'Web App',
        technologies: 'Next.js,React,Tailwind CSS,TypeScript',
        image: '/venoma.png',
        liveUrl: 'https://venoma-chi.vercel.app/', // Add your real URL
        githubUrl: 'https://github.com/KRI5H03/venoma',
        isRealProject: false, // Practice project
        order: 3,
      },
      {
        title: 'Serene',
        description: 'Minimalist web application focused on user experience',
        longDesc: 'A serene and minimalist web application emphasizing clean design and smooth user interactions. Built with performance and accessibility in mind.',
        category: 'Web App',
        technologies: 'Next.js,React,Tailwind CSS',
        image: '/serene.png',
        liveUrl: 'https://serene-k.vercel.app/', // Add your real URL
        githubUrl: 'https://github.com/KRI5H03/serene',
        isRealProject: false, // Practice project
        order: 4,
      },
    ],
  })

  console.log('✅ Real projects added successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    prisma.$disconnect()
  })