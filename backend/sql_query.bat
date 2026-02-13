@echo off
mysql -u root -pHari@ff555 -D skilldecaypredictor -e "SELECT u.email, s.name, us.needs_revision FROM user_skills us JOIN users u ON us.user_id = u.id JOIN skills s ON us.skill_id = s.id WHERE u.email = 'gokul@gmail.com' AND s.name = 'java';"
