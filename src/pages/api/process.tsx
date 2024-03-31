import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import xlsx from 'node-xlsx';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function process(req: NextApiRequest, res: NextApiResponse) {

if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
}

const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the form:', err);
      res.status(500).json({ error: 'Error parsing the form data.' });
      return;
    }

    const apikey = fields.apikey[0] as string;
    console.log(apikey) 

    if (!apikey || !files.file) {
      res.status(400).json({ error: 'File and API key are required.' });
      return;
    }

    const file = files.file[0];

    try {
      const fileData = fs.readFileSync(file.filepath);
      const parsedData = xlsx.parse(fileData);
      const sheet = parsedData[0]; // Assuming the data is in the first sheet
      let data = [];

      // Skip the header row and start processing from the second row
      for (let i = 1; i < sheet.data.length; i++) {
        const row = sheet.data[i];
        const email = row[0]; // Assuming email is in the first column

        console.log('Processing email:', email)
        console.log(apikey)
        // Now, send this email to the external API for enrichment
        // const response = await axios.get('https://api.reversecontact.com/enrichment', {
        //   params: { email, apikey },
        // });

        // Push the response or the required data into the processedData array
        // data.push(response.data);
      }

    //   res.status(200).json({ data });
    data = {
        "data": [
          {
            "success": true,
            "email": "prabin.paudel60@gmail.com",
            "emailType": "personal",
            "person": {
              "publicIdentifier": "prabin-paudel-0116734b",
              "linkedInIdentifier": "ACoAAAqZQ00BBrxvb1GQWlOp4evIvvKNV2I5V7k",
              "firstName": "Prabin",
              "lastName": "Paudel",
              "headline": "Full Stack Software Engineer",
              "location": "Surkhet, Nepal",
              "positions": {
                "positionsCount": 3,
                "positionHistory": [
                  {
                    "startEndDate": {
                      "start": {
                        "month": 2,
                        "year": 2017
                      }
                    },
                    "title": "Freelance",
                    "description": "Skills: PHP · JavaScript · Web Development · WordPress",
                    "companyName": "Freelance",
                    "companyLogo": null,
                    "linkedInUrl": "https://www.linkedin.com/search/results/all/?keywords=Freelance"
                  },
                  {
                    "startEndDate": {
                      "start": {
                        "month": 3,
                        "year": 2020
                      },
                      "end": {
                        "month": 7,
                        "year": 2022
                      }
                    },
                    "title": "Software Engineer",
                    "contractType": "Full-time",
                    "description": "Skills: Laravel · CI/CD · MySQL · Docker · VUE · Vuex · Git",
                    "companyName": "Economic Reform Media Pvt. Ltd ",
                    "companyLogo": null,
                    "linkedInUrl": "https://www.linkedin.com/search/results/all/?keywords=Economic+Reform+Media+Pvt%2E+Ltd"
                  },
                  {
                    "startEndDate": {
                      "start": {
                        "month": 4,
                        "year": 2019
                      },
                      "end": {
                        "month": 3,
                        "year": 2020
                      }
                    },
                    "title": "Associate Software Engineer",
                    "contractType": "Full-time",
                    "description": "Skills: Laravel · VUE ",
                    "companyName": "APPLYJOB.COM ",
                    "companyLogo": "https://media.licdn.com/dms/image/C510BAQHuu-CRR6Ypyg/company-logo_200_200/0/1630593198230/applyjobcom_logo?e=1720051200&v=beta&t=AGGSYLkwn8YHcZ6oGUwJU52FtkszeQrX2E6IWzegcmE",
                    "linkedInUrl": "https://www.linkedin.com/company/13286834/",
                    "linkedInId": "13286834"
                  }
                ]
              },
              "creationDate": {
                "month": 4,
                "year": 2012
              },
              "followerCount": 105,
              "schools": {
                "educationsCount": 2,
                "educationHistory": [
                  {
                    "startEndDate": {
                      "start": {
                        "year": 2015
                      },
                      "end": {
                        "year": 2019
                      }
                    },
                    "schoolName": "University of Central Lancashire",
                    "degreeName": "Bachelor's degree, Computer Science",
                    "fieldOfStudy": "Bachelor's degree, Computer Science",
                    "schoolLogo": "https://media.licdn.com/dms/image/C4E0BAQEpYjLJop5d3g/company-logo_200_200/0/1663750298709/university_of_central_lancashire_logo?e=1720051200&v=beta&t=uEYHDuctasXWzla2i45RhKIN4BdHwRfYL1VA0IV9SC0",
                    "linkedInUrl": "https://www.linkedin.com/company/20729/"
                  },
                  {
                    "startEndDate": {
                      "start": {
                        "year": 2013
                      },
                      "end": {
                        "year": 2015
                      }
                    },
                    "schoolName": "Capital College And Research Center",
                    "degreeName": "High School Diploma, Physical Sciences",
                    "fieldOfStudy": "High School Diploma, Physical Sciences",
                    "schoolLogo": null,
                    "linkedInUrl": "https://www.linkedin.com/search/results/all/?keywords=Capital+College+And+Research+Center"
                  }
                ]
              },
              "summary": "Skilled full-stack engineer with 4.6 years of experience in Laravel, Vue JS, MySQL, and other popular software development stacks.\nExpertise in rapid API development, analysis, design, development, and testing.\nExperienced in problem-solving and working on local and production applications.\nFamiliar with Git Version control, Gitlab CI/CD, and complex and relational eloquent queries for Laravel.\nExposure to a variety of programming languages, including PHP Core, Dart, Java, Python, React, Vue JS, and JavaScript.\nSound knowledge of Unix and Linux operating systems.\nAbility to work effectively as part of a team or independently.\nHighly motivated and curious about innovative technology.\nCompleted and published various small- and large-scale web applications and projects.",
              "skills": [
                "Model-View-Controller (MVC)",
                "VUE",
                "Vuex",
                "MySQL",
                "CI/CD",
                "Docker",
                "VUE ",
                "Web Development",
                "WordPress",
                "Laravel",
                "vuejs",
                "PHP",
                "HTML5",
                "SQL",
                "Cascading Style Sheets (CSS)",
                "JavaScript",
                "Oracle SQL Developer",
                "Git",
                "Flutter",
                "Python (Programming Language)"
              ],
              "languages": [],
              "linkedInUrl": "https://linkedin.com/in/prabin-paudel-0116734b"
            },
            "company": false,
            "credits_left": 11,
            "rate_limit_left": 11
          },
          {
            "success": true,
            "email": "actionbishal98130@gmail.com",
            "emailType": "personal",
            "person": {
              "publicIdentifier": "bishal-adhikari-b2012612b",
              "linkedInIdentifier": "ACoAAB_gTMgBU5VvpEbTcQNoG1ZVY0dNq95h2g8",
              "firstName": "Bishal",
              "lastName": "Adhikari",
              "headline": "Computer Engineer , Full stack Software Developer, Laravel and Vuejs developer",
              "location": "Nepal",
              "photoUrl": "https://media.licdn.com/dms/image/D4D03AQHbMetbBJc7lw/profile-displayphoto-shrink_800_800/0/1697271126024?e=1717632000&v=beta&t=4mzuBVQumL1RTibiOaZ3JkAMyMfNFuY-1I_mlFKadYU",
              "positions": {
                "positionsCount": 4,
                "positionHistory": [
                  {
                    "startEndDate": {
                      "start": {
                        "month": 5,
                        "year": 2021
                      }
                    },
                    "title": "Software Developer",
                    "contractType": "Full-time",
                    "description": "Skills: Laravel · Vue.js",
                    "companyName": "Gamenic Nalamiz Tech ",
                    "companyLogo": "https://media.licdn.com/dms/image/C4D0BAQGYcFATJxKr0w/company-logo_200_200/0/1642757892194?e=1720051200&v=beta&t=ELN_jBlacCesV1Ni3GpCxhUzC_E3stmOhH1S7O79WeY",
                    "linkedInUrl": "https://www.linkedin.com/company/78720518/",
                    "linkedInId": "78720518"
                  },
                  {
                    "startEndDate": {
                      "start": {
                        "month": 3,
                        "year": 2020
                      },
                      "end": {
                        "month": 2,
                        "year": 2021
                      }
                    },
                    "title": "Software Developer",
                    "description": "Skills: Laravel · Vue.js · Flutter",
                    "companyName": "EEE Innovation Ghar Pvt Ltd",
                    "companyLogo": null,
                    "linkedInUrl": "https://www.linkedin.com/search/results/all/?keywords=EEE+Innovation+Ghar+Pvt+Ltd"
                  },
                  {
                    "startEndDate": {
                      "start": {
                        "month": 3,
                        "year": 2019
                      },
                      "end": {
                        "month": 2,
                        "year": 2020
                      }
                    },
                    "title": "Software Engineer",
                    "description": "Skills: Laravel · Vue.js",
                    "companyName": "APPLYJOB.COM",
                    "companyLogo": "https://media.licdn.com/dms/image/C510BAQHuu-CRR6Ypyg/company-logo_200_200/0/1630593198230/applyjobcom_logo?e=1720051200&v=beta&t=AGGSYLkwn8YHcZ6oGUwJU52FtkszeQrX2E6IWzegcmE",
                    "linkedInUrl": "https://www.linkedin.com/company/13286834/",
                    "linkedInId": "13286834"
                  },
                  {
                    "startEndDate": {
                      "start": {
                        "month": 3,
                        "year": 2018
                      },
                      "end": {
                        "month": 6,
                        "year": 2018
                      }
                    },
                    "title": "PHP/JS Developer",
                    "description": "Skills: Laravel",
                    "companyName": "CrossOver Nepal Pvt. Ltd",
                    "companyLogo": null,
                    "linkedInUrl": "https://www.linkedin.com/search/results/all/?keywords=CrossOver+Nepal+Pvt%2E+Ltd"
                  }
                ]
              },
              "creationDate": {
                "month": 10,
                "year": 2016
              },
              "followerCount": 214,
              "schools": {
                "educationsCount": 1,
                "educationHistory": [
                  {
                    "startEndDate": {
                      "start": {
                        "year": 2012
                      },
                      "end": {
                        "year": 2016
                      }
                    },
                    "schoolName": "Paschimanchal Campus, Institute of Engineering, Tribhuvan University",
                    "degreeName": "Bachelor's degree, Computer Engineering",
                    "fieldOfStudy": "Bachelor's degree, Computer Engineering",
                    "schoolLogo": null,
                    "linkedInUrl": "https://www.linkedin.com/search/results/all/?keywords=Paschimanchal+Campus%2C+Institute+of+Engineering%2C+Tribhuvan+University"
                  }
                ]
              },
              "skills": [
                "Laravel",
                "Vue.js",
                "Flutter",
                "Amazon Web Services (AWS)",
                "Microsoft Azure",
                "Google Cloud Platform (GCP)",
                "Android Development",
                "Java",
                "Node.js",
                "Flask",
                "Computer Engineering",
                "Full-Stack Development",
                "Ionic Framework",
                "AngularJS",
                "WordPress",
                "Firebase",
                "Cloud Firestore",
                "jQuery"
              ],
              "languages": [],
              "linkedInUrl": "https://linkedin.com/in/bishal-adhikari-b2012612b"
            },
            "company": {
              "websiteUrl": "https://nalamiz.gamenic.io",
              "name": "Gamenic Nalamiz Tech",
              "logo": "https://media.licdn.com/dms/image/C4D0BAQGYcFATJxKr0w/company-logo_200_200/0/1642757892194?e=1720051200&v=beta&t=ELN_jBlacCesV1Ni3GpCxhUzC_E3stmOhH1S7O79WeY",
              "employeeCount": 25,
              "description": "We are looking for SENIOR/MID LEVEL DEVELOPER (Laravel & Vue Developer) and Software QA Engineers.  Please email you CV at gamenicnalamizhr@gmail.com",
              "tagline": null,
              "specialities": [
                "Software Development",
                "Website Design",
                "UI and UX design Service",
                "Mobile Apps",
                "Software quality control and test automation"
              ],
              "headquarter": {
                "country": "NP",
                "geographicArea": "3",
                "city": "Bhaktapur",
                "postalCode": "44800"
              },
              "foundedOn": {},
              "industry": "Software Development",
              "universalName": "gamenic-nalamiz-tech",
              "linkedInUrl": "https://www.linkedin.com/company/gamenic-nalamiz-tech/",
              "linkedInId": "78720518",
              "linkedinUrl": "https://www.linkedin.com/company/gamenic-nalamiz-tech/",
              "linkedinId": "78720518"
            },
            "credits_left": 10,
            "rate_limit_left": 10
          }
        ]
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error processing the file:', error);
      res.status(500).json({ error: 'Error processing the file.' });
    }
  });
}
