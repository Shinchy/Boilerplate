## Setup guide:

get git repository from the following location:

	https://github.com/Shinchy/Boilerplate.git
	--

All build work is done within the App folder, which in turn will output to the Client folder.
If you want to replace this folder with a 'Host' folder 

## Gulp

gulpfile.js - This is the project runner

	gulp watch - this will load the server using Browser Sync

	gulp images - this will minify all the images (there is no watch on the images to 
	prevent junk)


## Notes

The project is all output to the folder: client

The project is all built within the App folder.

Use gulp to build everything, ideally just run 'gulp watch' to get it up and going. This 
will also start a Browser Sync that will run on a local host.

All the data for each location is stored in the folder : app/views/data/

	This is where the data files live, can be loaded in if you want to render out HTML 
	pages using JSON data.

This is where the image folder, name, copy and text is all stored. Update this to 
update the content loaded into the build.

	
=======
