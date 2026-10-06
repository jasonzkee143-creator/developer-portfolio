@echo off
set USER=jasonzkee143-creator
set REPO=developer-portfolio
git remote set-url origin https://github.com/%USER%/%REPO%.git

git push -u origin main --force
pause

