cd functions
call gulp build
cd ..
firebase deploy --only functions
