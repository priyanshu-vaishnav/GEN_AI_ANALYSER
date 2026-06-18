const selfDescription = `
Hi, I'm a passionate Python Developer with over 4 years of experience specializing in building scalable backend systems, designing robust RESTful/GraphQL APIs, and automating complex workflows. 

I thrive in agile environments where I can leverage frameworks like Django and FastAPI to turn complex business logic into clean, maintainable code. Lately, I've been heavily focused on cloud-native architectures (AWS) and integrating Machine Learning models into production environments. I’m someone who loves optimizing database queries to shave off milliseconds and writing comprehensive unit tests to ensure high code quality. 

Outside of core coding, I am a strong advocate for DevOps practices, frequently setting up CI/CD pipelines to streamline deployment. I'm looking for a role where I can solve challenging scalability problems and contribute to a forward-thinking engineering team.
`.trim();

const resume = `
# MOHIT SHARMA
**Python Developer | Backend Engineer**
Email: mohit.sharma@email.com | Phone: +91 98765 43210 | Location: Bengaluru, India
LinkedIn: linkedin.com/in/mohit-python-dev | GitHub: github.com/mohit-codes

---

### PROFESSIONAL SUMMARY
Result-oriented Python Developer with 4+ years of hands-on experience in designing, developing, and deploying enterprise-grade backend applications. Expert in Django, FastAPI, and cloud technologies (AWS), with a proven track record of improving API performance by 40% and reducing deployment times through robust CI/CD pipelines.

### TECHNICAL SKILLS
* **Languages:** Python (Advanced), SQL, JavaScript
* **Frameworks:** Django, Flask, FastAPI, Celery
* **Databases:** PostgreSQL, MySQL, Redis, MongoDB
* **Cloud & DevOps:** AWS (EC2, S3, RDS, Lambda), Docker, GitHub Actions, Jenkins
* **Tools & Methodologies:** Git, Agile/Scrum, PyTest, Jira, OpenAPI/Swagger

### WORK EXPERIENCE

**Senior Backend Engineer | TechSolutions Corp** *January 2024 – Present*
* Architected and migrated a legacy monolithic application to a microservices architecture using **FastAPI**, improving system scalability and reducing response time by 35%.
* Designed and implemented asynchronous task queues using **Celery** and **Redis** to handle high-volume background processing (1M+ events/day).
* Optimized complex PostgreSQL queries and implemented indexing strategies, reducing database CPU utilization by 25%.
* Mentored 3 junior developers and established code review guidelines to ensure high-quality deliverables.

**Python Developer | Innovate Labs** *June 2022 – December 2023*
* Developed core backend modules for an e-commerce platform using **Django** and Django REST Framework (DRF).
* Integrated secure third-party payment gateways (Stripe, Razorpay) and OAuth2 authentication.
* Containerized applications using **Docker** and managed deployments on **AWS EC2** instances.
* Wrote automated unit and integration tests using **PyTest**, achieving 85%+ test coverage.

### EDUCATION
* **Bachelor of Technology (B.Tech) in Computer Science** ABC University, Graduated 2022

### PROJECTS
* **AI-Powered Search Engine:** Built a backend service using Python and Elasticsearch to provide real-time, relevant search results across 500k+ products.
* **Automated Data Pipeline:** Developed a serverless data scraping and processing pipeline using AWS Lambda and Python (Pandas/BeautifulSoup).
`.trim();

const jobDescription = `
### Role: Senior Python Developer
**Company:** CloudScale Innovations  
**Location:** Remote / Hybrid (Bengaluru)

**About the Role:**
We are looking for a Senior Python Developer who is passionate about building high-performance backend systems. You will be responsible for managing the interchange of data between the server and the users, developing server-side logic, and ensuring high responsiveness to requests from the front-end.

**Key Responsibilities:**
* Write clean, scalable, and efficient Python code.
* Develop and maintain robust REST and GraphQL APIs using Django or FastAPI.
* Integrate user-facing elements developed by front-end developers with server-side logic.
* Implement security and data protection solutions.
* Design and optimize low-latency, high-availability, and performant applications.
* Integrate data storage solutions including databases (PostgreSQL), key-value stores (Redis), and blob storage.

**Requirements:**
* 3-5 years of professional experience as a Python Developer.
* Strong expertise in **Django**, **Flask**, or **FastAPI**.
* Solid understanding of relational databases (**PostgreSQL**, MySQL) and ORM tools.
* Basic understanding of front-end technologies like React or Angular is a plus.
* Experience with **Docker** and cloud platforms like **AWS** or GCP.
* Proficiency with code versioning tools, such as Git.
* Strong problem-solving skills and capability to work in a fast-paced environment.
`.trim();

module.exports = {
    selfDescription,
    resume,
    jobDescription
};