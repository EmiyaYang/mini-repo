set -e

git branch -D gh-pages || echo ''
git checkout -b gh-pages

cp package.json ./public

ls | grep -v public | xargs rm -r
 
cd public  
cp -r . ..
cd -
rm -rf public

rm -rf .babelrc

git add .

git commit -m "deploy"

git push --set-upstream origin gh-pages -f

git checkout master