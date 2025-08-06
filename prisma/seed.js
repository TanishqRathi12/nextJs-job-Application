import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create Publisher Users (Company owners)
  const publisher1 = await prisma.user.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      password: await bcrypt.hash('publisher123', 10),
    },
  });

  const publisher2 = await prisma.user.create({
    data: {
      name: 'Michael Chen',
      email: 'michael@innovateai.com',
      password: await bcrypt.hash('publisher123', 10),
    },
  });

  // Create Regular Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'User',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'User',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Robert Wilson',
        email: 'robert@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'User',
      },
    }),
  ]);

  // Create Companies
  const company1 = await prisma.company.create({
    data: {
      name: 'TechCorp Solutions',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200',
      description: 'Leading technology solutions provider specializing in cloud computing, AI, and enterprise software development. We help businesses transform digitally.',
      user_id: publisher1.id,
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'InnovateAI Labs',
      logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=200',
      description: 'Cutting-edge artificial intelligence research and development company. We create AI solutions that revolutionize industries and improve lives.',
      user_id: publisher2.id,
    },
  });

  console.log('Companies created successfully');

  // Create Reviews
  await Promise.all([
    prisma.review.create({
      data: {
        user_id: users[0].id,
        company_id: company1.id,
        rating: 5,
        comment: 'Excellent company culture and great work-life balance. Management is very supportive.',
      },
    }),
    prisma.review.create({
      data: {
        user_id: users[1].id,
        company_id: company1.id,
        rating: 4,
        comment: 'Good learning opportunities and competitive salary. Office facilities are top-notch.',
      },
    }),
    prisma.review.create({
      data: {
        user_id: users[2].id,
        company_id: company2.id,
        rating: 5,
        comment: 'Amazing team of brilliant minds. Working on cutting-edge AI projects is incredibly rewarding.',
      },
    }),
    prisma.review.create({
      data: {
        user_id: users[0].id,
        company_id: company2.id,
        rating: 4,
        comment: 'Innovative environment with lots of room for growth. Great benefits package.',
      },
    }),
  ]);

  // Create 20 Jobs
  const jobs = [
    // TechCorp Solutions Jobs (12 jobs)
    {
      job_title: 'Senior Full Stack Developer',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will work on cutting-edge web applications using React, Node.js, and PostgreSQL. Experience with cloud platforms (AWS/Azure) is preferred.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'San Francisco',
      job_location: 'San Francisco, CA (Remote)',
      job_salary: 120000,
      user_id: publisher1.id,
    },
    {
      job_title: 'DevOps Engineer',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Join our infrastructure team as a DevOps Engineer. You will be responsible for CI/CD pipelines, containerization with Docker/Kubernetes, and cloud infrastructure management.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'Austin',
      job_location: 'Austin, TX',
      job_salary: 110000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Frontend Developer (React)',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'We need a skilled Frontend Developer with expertise in React, TypeScript, and modern CSS frameworks. You will create responsive, user-friendly interfaces for our enterprise applications.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'New York',
      job_location: 'New York, NY (Hybrid)',
      job_salary: 95000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Backend Developer (Node.js)',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Looking for a Backend Developer proficient in Node.js, Express, and database design. You will build scalable APIs and microservices for our cloud-based platform.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Seattle',
      job_location: 'Seattle, WA (Remote)',
      job_salary: 105000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Cloud Solutions Architect',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Senior role designing and implementing cloud solutions for enterprise clients. Requires extensive experience with AWS/Azure, serverless architectures, and system design.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'San Francisco',
      job_location: 'San Francisco, CA',
      job_salary: 150000,
      user_id: publisher1.id,
    },
    {
      job_title: 'QA Automation Engineer',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Join our QA team to develop automated testing frameworks. Experience with Selenium, Jest, and CI/CD integration required. Help ensure our software quality.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Denver',
      job_location: 'Denver, CO (Remote)',
      job_salary: 85000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Product Manager',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Lead product strategy and roadmap for our enterprise software suite. Work closely with engineering, design, and sales teams to deliver customer-focused solutions.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'San Francisco',
      job_location: 'San Francisco, CA',
      job_salary: 130000,
      user_id: publisher1.id,
    },
    {
      job_title: 'UX/UI Designer',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Create intuitive and beautiful user experiences for our B2B applications. Proficiency in Figma, user research, and design systems required.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Los Angeles',
      job_location: 'Los Angeles, CA (Hybrid)',
      job_salary: 90000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Data Engineer',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Build and maintain data pipelines using Python, Apache Spark, and cloud data services. Experience with data warehousing and ETL processes essential.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Chicago',
      job_location: 'Chicago, IL (Remote)',
      job_salary: 115000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Cybersecurity Specialist',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Protect our infrastructure and client data. Implement security best practices, conduct vulnerability assessments, and respond to security incidents.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'Washington',
      job_location: 'Washington, DC',
      job_salary: 125000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Mobile App Developer (React Native)',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Develop cross-platform mobile applications using React Native. Experience with native iOS/Android development is a plus.',
      job_employment_type: 'Contract',
      job_is_remote: true,
      job_city: 'Miami',
      job_location: 'Miami, FL (Remote)',
      job_salary: 80000,
      user_id: publisher1.id,
    },
    {
      job_title: 'Sales Engineer',
      company_id: company1.id,
      job_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
      job_publisher: 'TechCorp Solutions',
      job_description: 'Bridge the gap between sales and technical teams. Present technical solutions to clients and support the sales process with your engineering expertise.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'Boston',
      job_location: 'Boston, MA',
      job_salary: 100000,
      user_id: publisher1.id,
    },

    // InnovateAI Labs Jobs (8 jobs)
    {
      job_title: 'Machine Learning Engineer',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Work on cutting-edge ML models and deploy them at scale. Experience with TensorFlow/PyTorch, MLOps, and cloud ML services required.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Palo Alto',
      job_location: 'Palo Alto, CA (Hybrid)',
      job_salary: 140000,
      user_id: publisher2.id,
    },
    {
      job_title: 'AI Research Scientist',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Conduct groundbreaking research in artificial intelligence. PhD in Computer Science, Machine Learning, or related field preferred. Publish in top-tier conferences.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'Palo Alto',
      job_location: 'Palo Alto, CA',
      job_salary: 180000,
      user_id: publisher2.id,
    },
    {
      job_title: 'Data Scientist',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Extract insights from large datasets to drive AI model improvements. Strong background in statistics, Python, and data visualization tools.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'San Jose',
      job_location: 'San Jose, CA (Remote)',
      job_salary: 120000,
      user_id: publisher2.id,
    },
    {
      job_title: 'Deep Learning Engineer',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Specialize in neural network architectures and deep learning frameworks. Work on computer vision and NLP projects with real-world impact.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Berkeley',
      job_location: 'Berkeley, CA (Remote)',
      job_salary: 135000,
      user_id: publisher2.id,
    },
    {
      job_title: 'AI Product Manager',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Lead AI product development from conception to market. Bridge technical AI capabilities with business needs and customer requirements.',
      job_employment_type: 'Full-time',
      job_is_remote: false,
      job_city: 'Palo Alto',
      job_location: 'Palo Alto, CA',
      job_salary: 145000,
      user_id: publisher2.id,
    },
    {
      job_title: 'Computer Vision Engineer',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Develop advanced computer vision systems for autonomous vehicles and robotics. Experience with OpenCV, deep learning, and real-time processing.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Mountain View',
      job_location: 'Mountain View, CA (Hybrid)',
      job_salary: 130000,
      user_id: publisher2.id,
    },
    {
      job_title: 'NLP Engineer',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Build state-of-the-art natural language processing systems. Work with transformer models, language generation, and conversational AI.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'Stanford',
      job_location: 'Stanford, CA (Remote)',
      job_salary: 125000,
      user_id: publisher2.id,
    },
    {
      job_title: 'AI Ethics Researcher',
      company_id: company2.id,
      job_logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100',
      job_publisher: 'InnovateAI Labs',
      job_description: 'Ensure our AI systems are fair, transparent, and beneficial. Research AI safety, bias mitigation, and responsible AI practices.',
      job_employment_type: 'Full-time',
      job_is_remote: true,
      job_city: 'San Francisco',
      job_location: 'San Francisco, CA (Remote)',
      job_salary: 115000,
      user_id: publisher2.id,
    },
  ];

  // Create all jobs
  await Promise.all(
    jobs.map(job => prisma.job.create({ data: job }))
  );

  console.log('✅ Database seeded successfully!');
  console.log(`Created:
  - ${await prisma.user.count()} users
  - ${await prisma.company.count()} companies  
  - ${await prisma.job.count()} jobs
  - ${await prisma.review.count()} reviews`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });