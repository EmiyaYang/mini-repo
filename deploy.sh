set -e

git branch -D gh-pages || echo ''
git checkout -b gh-pages

ls | grep -v public | grep -v node_modules | xargs rm -r
 
cd public  
cp -r . ..
cd -
rm -rf public

rm -rf .gitignore
rm -rf .babelrc

git add .

git commit -m "deploy"

git push --set-upstream origin gh-pages -f

git checkout master