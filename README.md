# 💼 JobSetu

**JobSetu** is a smart, full-stack job discovery and assessment platform that helps users explore job opportunities scraped from popular job portals, while also guiding them through personalized job recommendations using a skill-based questionnaire.

---


## 🚀 Features

### 🎯 JobSetu Carrierwise (Job Search Platform)
- ✅ User authentication (Register, Login, Logout)
- 🔍 Search jobs from portals like **LinkedIn**, **Naukri**, **Indeed** using web scraping
- 💼 View detailed job descriptions (skills, salary, location, etc.)
- ⭐ Add jobs to favorites
- 📥 Apply for jobs via external links
- 🧑‍💼 User profile management
- 🛠️ Admin panel for managing jobs and users
- 🎯 Personalized job recommendations based on score
- 💾 Database support: **SQLite** (default) and **MySQL**

### 🧠 JobSetu Questionnaire (Job Assessment Platform)
- 🧾 Dynamic questionnaire based on user profile/skills
- 🧮 Score calculation and analysis
- 🔗 Integrated with job data from Carrierwise module
- 💬 REST communication between modules
-  💾 Database support: **MySQL**

### 💡 Extras
- ⚡ Fast and responsive UI built with **React** and **Tailwind CSS**
- 📱 Mobile-friendly design
- 🔗 Modular architecture for scalability

---

## 🔧 Tech Stack

| Module               | Tech Used                           |
|----------------------|-------------------------------------|
| **Frontend**         | React, Tailwind CSS                 |
| **Backend (Search)** | Django, Django REST Framework       |
| **Backend (Quiz)**   | Spring Boot                         |
| **Scraping**         | BeautifulSoup, Requests             |
| **Databases**        | SQLite (dev), MySQL (prod-ready)    |
| **Communication**    | REST APIs between Django & Spring   |

---

## 🧱 Project Structure
```bash
jobsetu/
├── jobsetu_carrierwise/ # Django + React based job search platform
│ ├── backend/ # Django + DRF APIs
│ └── frontend/ # React (Tailwind CSS)
├── jobsetu_questionnaire/ # Spring Boot + React based job assessment
│ ├── backend/ # Spring Boot APIs
│ └── frontend/ # React (Tailwind CSS)
└── README.md


---

### 💡 Run on Ports
- ⚡ **Run on Local ** --   http://localhost:5174/
- 📱 **Admin site at** --    http://127.0.0.1:8000/
- 🔗 **spring on** --   http://127.0.0.1:8080/

---