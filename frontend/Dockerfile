FROM node:18.4.0

RUN npm install -g http-server

WORKDIR /home/node/app

CMD [ "http-server", "-p", "8080", "./public" ]

# https://www.yalco.kr/36_docker/

# 이미지 생성 명령어 (현 파일과 같은 디렉토리에서)
# docker build -t {이미지명} .
# 이미지명: front-img 
# docker build -t front-img .

# images 확인
# docker ps

# 컨테이너 생성 & 실행 명령어
# docker run --name {컨테이너명} -v $(pwd):/usr/src/app -p 5000:5000 {이미지명}
# 컨테이너명: front-con
# docker run --name front-con -v ${pwd}:/home/node/app -p 5000:5000 front-img