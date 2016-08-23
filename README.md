# Chrome Extension for CODE2040 API Challenge 

This chrome extension connects to CODE2040's API. It bypasses Chrome's CORS policy due to the fact that is it an extension, and in the manifest file CODE2040's API has been declared as a permissible access point.

# What I Learned

I learned about the technical capabilities of Chrome Extensions, and how to create one. The process requires nearly everything a normal website needs in addition to a manifest file.

I also learned that programmers should not make assumptions while programming. I thought that the server responded with a 400 error (Bad Request) becuase the data I was sending wasn't formatted correctly. That was just assumption, and the server only responded like that because my data didn't have the correct response for that challenge.

# .gitignore

The .gitignore file contains my private token key to connect to the API.
