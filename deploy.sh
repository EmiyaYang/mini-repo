set -e

git branch -D gh-pages || echo ''
git checkout -b gh-pages

cp package.json ./dist

ls | grep -v dist | xargs rm -r
 
cd dist  
cp -r . ..
cd -
rm -rf dist

rm -rf .babelrc

git add .

git commit -m "deploy"

git push --set-upstream origin gh-pages -f

git checkout master