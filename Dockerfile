FROM node:24-alpine3.21

WORKDIR /app


COPY package*.json .

RUN  ["npm" , "i"]

COPY . .

ENV DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19PVV9Vdko5UklHRzlTazhYQlRFc0QiLCJhcGlfa2V5IjoiMDFLMUpGQ0Q4U0pIN0RYUk1UMkJOTjRBVEIiLCJ0ZW5hbnRfaWQiOiJmNmM1Y2IzOTg0OTY1ZTMwNTU4ZTQzYzI1ZDljODMwNGJhZWU4NDVkMmM0M2YxZmI4M2RiZWYzMTNmNTMyOWE2IiwiaW50ZXJuYWxfc2VjcmV0IjoiM2EzYmEwMDUtMTc5MS00YmUyLWE0ZWEtNWNlNjRjNDUyN2U2In0.vI6l38lUjFd1QToeSXZvVjxkL1rMlxQTX-XsDwk5840
ENV BASE_URL=http://localhost:3000/
ENV JWT_SECRET=sfhds*@$GUSI&nxakxjs

RUN ["npm" ,"run" ,"build"]

CMD ["npm" ,"run" ,"start"]







