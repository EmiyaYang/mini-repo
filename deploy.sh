set -e

#  git checkout --orphan gh-pages
NODE_ENV=prod 
yarn build

git checkout gh-pages

ls | grep -v public | grep -v node_modules | xargs rm -r
 
cd public  
cp -r . ..
cd -
rm -rf public

git add .

git commit -m "deploy"

git push --set-upstream origin gh-pages

git checkout master