# AnalyticsLog

AnalyticsLog is a web service which executes basic analysis on a log file with common log format(NCSA) and generates 3 analytics charts.

## Summary

The implementation of the back end for AnalyticsLog was developed in nodejs. The client was developed with Jquery and Bootstrap.
The user via the index page http://localhost:3000 can upload a sample log file. After the successful uploading of the file, 
the 3 charts are generated:
* The first chart is visualizing the average object size in bytes per file extension for the 20 most common file extensions.
* The second chart is visualizing the total visits per referrer for the 10 most common referrers.
* The third chart is visualizing the visits per day for the 10 most common referrers. (by clicking on label referrers you can filter out referrer datasets)

## Prerequisites

The implementation has been verified to work in windows10 with :

```
nodejs: v8.10.11
npm: 5.6.0
mocha: 3.4.2 (for tests)
```

## Setup/Run

1. Run: 'npm install' into the project directory.
2. Run: 'npm start' to start the server. Visit: 'http://localhost:3000' in a browser to reach the index page.
3. Run: 'npm test' to run all the tests (end to end, unit)

## Implementation details

### Api Details

#### upload the log file
```
resource: /api/logS
method: POST
```
Key for log files (form data attachment):

* logFile

#### Response HTTP status code 200:

Successful uploading of file.

#### Response HTTP status code 400 or 500:

If json file is missing or any other error is returned , respond with this error.


#### get data for charts
```
resource: /api/logs/charts
method: GET
```

#### Response HTTP status code 200:
```
Response Body:
{  
   chart1:{  
      datasetX:[  
         'html',
         'png',
         ...
      ],
      datasetY:[  
         234560,
         78900,
         ...
      ]
   },
   chart2:{  
      datasetX:[  
         'google',
         'wikipedia',
         ...
      ],
      datasetY:[  
         300,
         289,
         ...
      ]
   },
   chart3:{  
      days:[  
         '17/04/2018',
         '18/04/2018',
         ..
      ],
      datasets:[  
         {  
            host:'wikipedia',
            visits:[  
               234,
               140,
               ..
            ]
         },
         {  
            host:'logstash',
            visits:[  
               23,
               170,
               ..
            ]
         },
         ...
      ]
   }
}
```
#### Response HTTP status code 400 or 500:

If json file has invalid format or any other error is returned , respond with this error.

* Regarding error handling, I created a simple error middleware. (lib/middleware/error)
* For multipart request support I used https://www.npmjs.com/package/multer module.
(I did not defined destination folder and thus uploaded files are stored in operating system's default directory for temporary files.

### Storing and Parsing of Log file

Local storage module is used to store the path of the uploaded sample file.
Then, on each GET request for charts, the file is retrieved from path, parsed line by line with the clf-parser module
in order to generate the json log objects for further processing.
Validation is executed on each parsed line as well.

### Analytics Details

#### Counting
A Map has been used to find the counting per file extension/referrer.
Then convert map to array, sorted based on counting and retrieved the first x most common values.

#### Visits
For each line in the log file the time to the previous request from the same IP is calculated.
If the difference is bigger than a given time  the analyzer counts a new visit.
The value for the timeout is 30 minutes. In other words – if the visitor is inactive for more than 30 minutes – a new visit is counted with the next request system serves for that visitor.

### Testing

End to end tests are available in `test` directory.
Find in `fixtures` directory sample data which are used in tests.
Unit tests are available in `unit` directory.
The unit tests are dedicated for verifying the functionality of analytics service.

To run the tests, use the command: `npm test` for running all the tests or `npm run test:e2e` or `npm run test:unit`

