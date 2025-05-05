import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import random
import re
from datetime import datetime, timedelta
from .models import JobListing
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
def setup_driver(headless=True):
    options = Options()

    if headless:
        options.add_argument("--headless=new")  # better headless mode

    # Spoof user-agent to look like a real browser
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    )

    # Disable automation flags
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    # Set window size and GPU options
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Further reduce automation detection
    driver.execute_cdp_cmd(
        'Page.addScriptToEvaluateOnNewDocument',
        {
            'source': '''
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => undefined
                })
            '''
        }
    )

    return driver

def parse_relative_date(text):
    text = text.lower()
    if "day" in text:
        days = int(re.search(r'(\d+)', text).group(1))
        return (datetime.today() - timedelta(days=days)).strftime('%Y-%m-%d')
    elif "just" in text or "today" in text:
        return datetime.today().strftime('%Y-%m-%d')
    return None

class IndiaJobScraper:
    def __init__(self):
        self.driver = None
    # ##############################!    naukri
    
    # def scrape_naukri(self, search_term, location="India"):
    #     try:
    #         self.driver = setup_driver()

    #         # Prepare search URL
    #         search_term_slug = search_term.replace(' ', '-')
    #         search_term_query = search_term.replace(' ', '+')
    #         location_slug = location.replace(' ', '-')
    #         location_query = location.replace(' ', '+')
    #         url = f"https://www.naukri.com/{search_term_slug}-jobs?k={search_term_query}&l={location_query}"
    #         print("🔗 Visiting:", url)

    #         self.driver.get(url)

    #         # Wait for job listings to load (instead of time.sleep)
    #         WebDriverWait(self.driver, 10).until(
    #             EC.presence_of_element_located((By.CLASS_NAME, "jobTuple"))
    #         )

    #         # Debug: save HTML for inspection
    #         # with open("naukri_debug.html", "w", encoding="utf-8") as f:
    #         #     f.write(self.driver.page_source)

    #         soup = BeautifulSoup(self.driver.page_source, 'html.parser')
    #         jobs = []

    #         for job in soup.find_all('div', class_='jobTuple'):
    #             try:
    #                 title_tag = job.find('a', class_='title')
    #                 company_tag = job.find('a', class_='subTitle')
    #                 location_tag = job.find('li', class_='location')
    #                 desc_tag = job.find('div', class_='job-description')
    #                 posted_tag = job.find('span', class_='type')
    #                 skills_tag = job.find('ul', class_='tags')
    #                 salary_tag = job.find('li', class_='salary')

    #                 title = title_tag.text.strip() if title_tag else "No title"
    #                 company = company_tag.text.strip() if company_tag else "No company"
    #                 location = location_tag.text.strip() if location_tag else "No location"
    #                 job_url = title_tag['href'] if title_tag and title_tag.has_attr('href') else "No URL"
    #                 description = desc_tag.text.strip() if desc_tag else "No description available"

    #                 posted_text = posted_tag.text.strip().replace("Posted", "").strip() if posted_tag else ""
    #                 posted_date = parse_relative_date(posted_text) or datetime.today().strftime('%Y-%m-%d')

    #                 skills = ", ".join([li.text.strip() for li in skills_tag.find_all('li')]) if skills_tag else "Not mentioned"
    #                 salary = salary_tag.text.strip() if salary_tag else "Not mentioned"

    #                 jobs.append({
    #                     'title': title,
    #                     'company': company,
    #                     'location': location,
    #                     'url': job_url,
    #                     'source': 'Naukri',
    #                     'description': description,
    #                     'posted_date': posted_date,
    #                     'skills': skills,
    #                     'salary': salary,
    #                 })
    #             except Exception as e:
    #                 print(f"⚠️ Job parsing error: {e}")
    #                 continue

    #         print(f"✅ Naukri: {len(jobs)} jobs scraped")
    #         return jobs

    #     except Exception as e:
    #         print(f"⚠️ Naukri Error: {str(e)}")
    #         return []

    #     finally:
    #         if self.driver:
    #             self.driver.quit()


    ####################! indeed
    def scrape_indeed_india(self, search_term, location="India"):
        try:
            params = {'q': search_term, 'l': location, 'fromage': '3'}
            response = requests.get("https://www.indeed.co.in/jobs", params=params, headers=HEADERS)
            soup = BeautifulSoup(response.text, 'html.parser')
            jobs = []

            for job in soup.find_all('div', class_='job_seen_beacon'):
                try:
                    title = job.find('h2').text.strip()
                    company = job.find('span', class_='companyName').text.strip()
                    location = job.find('div', class_='companyLocation').text.strip()
                    url = "https://www.indeed.co.in" + job.find('a')['href']

                    desc_tag = job.find('div', class_='job-snippet')
                    description = desc_tag.text.strip().replace('\n', ' ') if desc_tag else "No description available"

                    posted_tag = job.find('span', class_='date')
                    posted_text = posted_tag.text.strip() if posted_tag else ""
                    posted_date = parse_relative_date(posted_text) or datetime.today().strftime('%Y-%m-%d')

                    salary_tag = job.find('div', class_='salary-snippet')
                    salary = salary_tag.text.strip() if salary_tag else "Not mentioned"

                    skills = "Not mentioned"

                    jobs.append({
                        'title': title,
                        'company': company,
                        'location': location,
                        'url': url,
                        'source': 'Indeed India',
                        'description': description,
                        'posted_date': posted_date,
                        'skills': skills,
                        'salary': salary,
                        "source":"Indeed",

                    })
                except:
                    continue
            return jobs
        except Exception as e:
            print(f"⚠️ Indeed Error: {str(e)}")
            return []

    def scrape_linkedin_india(self, search_term, location="India"):
        try:
            self.driver = setup_driver()
            url = f"https://www.linkedin.com/jobs/search/?keywords={search_term.replace(' ', '%20')}&location={location.replace(' ', '%20')}"
            self.driver.get(url)
            time.sleep(random.uniform(3, 5))
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            jobs = []

            for job in soup.find_all('div', class_='base-card'):
                try:
                    title = job.find('h3').text.strip()
                    company = job.find('h4').text.strip()
                    location = job.find('span', class_='job-search-card__location').text.strip()
                    url = job.find('a')['href']

                    posted_tag = job.find('time')
                    posted_date = posted_tag['datetime'][:10] if posted_tag and posted_tag.has_attr('datetime') else datetime.today().strftime('%Y-%m-%d')

                    description = "No description available"
                    skills = "Not mentioned"
                    salary = "Not mentioned"

                    jobs.append({
                        'title': title,
                        'company': company,
                        'location': location,
                        'url': url,
                        'source': 'LinkedIn India',
                        'description': description,
                        'posted_date': posted_date,
                        'skills': skills,
                        'salary': salary,
                        # "source":"Linkedin",

                    })
                except:
                    continue
            return jobs
        except Exception as e:
            print(f"⚠️ LinkedIn Error: {str(e)}")
            return []
        finally:
            if self.driver:
                self.driver.quit()

    def scrape_internshala(self, search_term):
        try:
            self.driver = setup_driver()
            url = f"https://internshala.com/internships/{search_term.replace(' ', '%20')}-internship"
            self.driver.get(url)
            time.sleep(random.uniform(2, 4))
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            jobs = []

            for job in soup.find_all('div', class_='individual_internship'):
                try:
                    title = job.find('h3', class_='heading_4_5').text.strip()
                    company = job.find('h4', class_='heading_6').text.strip()
                    location = job.find('a', class_='location_link').text.strip()
                    url = "https://internshala.com" + job.find('a', class_='view_detail_button')['href']

                    desc_tag = job.find('div', class_='internship_other_details_container')
                    description = desc_tag.text.strip() if desc_tag else "No description available"

                    posted_tag = job.find('span', class_='status')
                    posted_date = posted_tag.text.replace("Posted on", "").strip() if posted_tag else datetime.today().strftime('%Y-%m-%d')

                    skills_tag = job.find('div', class_='individual_internship_skills')
                    skills = skills_tag.text.strip() if skills_tag else "Not mentioned"

                    salary_tag = job.find('span', class_='stipend')
                    salary = salary_tag.text.strip() if salary_tag else "Not mentioned"

                    jobs.append({
                        'title': title,
                        'company': company,
                        'location': location,
                        'url': url,
                        'source': 'Internshala',
                        'description': description,
                        'posted_date': posted_date,
                        'skills': skills,
                        'salary': salary,
                        "source":"Internshala",

                    })
                except:
                    continue
            return jobs
        except Exception as e:
            print(f"⚠️ Internshala Error: {str(e)}")
            return []
        finally:
            if self.driver:
                self.driver.quit()





    def scrape_linkedin_desc(self, search_term, location="India"):
        try:
            self.driver = setup_driver()
            url = f"https://www.linkedin.com/jobs/search/?keywords={search_term.replace(' ', '%20')}&location={location.replace(' ', '%20')}"
            self.driver.get(url)
            time.sleep(random.uniform(3, 5))
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)

            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            jobs = []
            job_cards = self.driver.find_elements(By.CLASS_NAME, 'base-card')

            for index, job_card in enumerate(job_cards):
                try:
                    # Scroll to the job to ensure it loads fully
                    self.driver.execute_script("arguments[0].scrollIntoView();", job_card)
                    time.sleep(1)
                    job_card.click()
                    time.sleep(random.uniform(2, 3))  # wait for job details to load

                    # Now parse the side panel for job description
                    job_soup = BeautifulSoup(self.driver.page_source, 'html.parser')

                    # Basic info
                    title = job_soup.find('h2', class_='t-24').text.strip() if job_soup.find('h2', class_='t-24') else "No title"
                    company = job_soup.find('span', class_='topcard__flavor').text.strip() if job_soup.find('span', class_='topcard__flavor') else "No company"
                    location_elem = job_soup.find('span', class_='topcard__flavor--bullet')
                    location = location_elem.text.strip() if location_elem else "No location"

                    job_url = self.driver.current_url
                    posted_tag = job_soup.find('span', class_='posted-time-ago__text')
                    posted_date = datetime.today().strftime('%Y-%m-%d') if not posted_tag else posted_tag.text.strip()

                    # Job Description
                    desc_elem = job_soup.find('div', class_='show-more-less-html__markup')
                    description = desc_elem.get_text(separator='\n').strip() if desc_elem else "No description available"

                    # Skills extraction (from description using keyword match, as LinkedIn doesn’t separate them)
                    keyword_skills = ['python', 'sql', 'excel', 'communication', 'django', 'javascript', 'react', 'aws', 'java', 'linux']
                    found_skills = [skill for skill in keyword_skills if skill.lower() in description.lower()]
                    skills = ', '.join(found_skills) if found_skills else "Not mentioned"

                    salary = "Depends"  # LinkedIn rarely shows salary in India

                    jobs.append({
                        'title': title,
                        'company': company,
                        'location': location,
                        'url': job_url,
                        'source': 'LinkedIn',
                        'description': description,
                        'posted_date': posted_date,
                        'skills': skills,
                        'salary': salary,
                    })
                except Exception as inner_e:
                    print(f"Error scraping job at index {index}: {inner_e}")
                    continue

            return jobs

        except Exception as e:
            print(f"⚠️ LinkedIn Error: {str(e)}")
            return []
        finally:
            if self.driver:
                self.driver.quit()










def run_scrapers(search_term, location="India"):
    scraper = IndiaJobScraper()
    jobs = []
    # jobs.extend(scraper.scrape_naukri(search_term, location))
    # print(len(jobs),"Naukri scrapper")
    # jobs.extend(scraper.scrape_indeed_india(search_term, location))
    jobs.extend(scraper.scrape_linkedin_india(search_term, location))
    # jobs.extend(scraper.scrape_linkedin_desc(search_term, location))
    # jobs.extend(scraper.scrape_internshala(search_term))

    for job in jobs:
        JobListing.objects.update_or_create(
            title=job['title'],
            company=job['company'],
            url=job['url'],
            defaults={
                'location': job['location'],
                'source': job['source'],
                'is_active': True,
                'description': job.get('description', 'No description available'),
                'posted_date': job.get('posted_date', datetime.today().strftime('%Y-%m-%d')),
                'skills': job.get('skills', 'Not mentioned'),
                'salary': job.get('salary', 'Not mentioned'),
            }
        )
    return jobs
