const { program } = require('commander');
const fs = require('fs');

require("dotenv").config()

const { Octokit } = require("octokit");

const GITHUB_ACCESS_TOKEN  = process.env.GITHUB_ACCESS_TOKEN;

if(!GITHUB_ACCESS_TOKEN) {
  console.error('GITHUB_ACCESS_TOKEN is not set');
  process.exit(1);
}

program.version('0.0.1');

const octokit = new Octokit({
  auth: GITHUB_ACCESS_TOKEN,
});

program
  .command('me')
  .description('check my profile')
  .action( async (keyword) => {
    const { data } = await octokit.request('GET /user');
    console.log(data);
  });

program
  .command('file-read')
  .description('Search for images')
  .action( async (keyword) => {
    const readFile = await fs.promises.readFile('../../.prettierrc', 'utf-8');

    // console.log(GITHUB_ACCESS_TOKEN);
    console.log(readFile);
    console.log(`Searching for ${keyword}`);
  });


// 버그 라벨이 붙은 이슈를 출력
program
  .command('list-bugs')
  .description('Search for images')
  .action( async (keyword) => {
    
    const result = await octokit.rest.issues.listForRepo({
      owner: 'frandeer',
      repo: 'stduy-node',
      labels: 'bug',
    })

    // rable print
    result.data.forEach(element => {      
        console.log(element.number, element.labels);
    });

    const hasBugLable = result.data.filter((issue) => {
      return issue.labels.find((label) => label.name === 'bug');
    })

    const output = hasBugLable.map((issue) => {
      return `${issue.number} ${issue.title}`;
    })

    console.log(output)


  });


// 풀 리퀘스트를 모두 검사해서, 만약 너무 diff가 큰(100줄 이상) 풀 리퀘스트가 있다면, 경고를 출력
program
  .command('check-pr')
  .description('Search for images')
  .action( async (keyword) => {

    const result = await octokit.rest.pulls.list({
      owner: 'frandeer',
      repo: 'stduy-node',
      state: 'open',
    })

    // rable print
    result.data.forEach(element => {
      console.log(element.number, element.title, element.diff_url);
    });

    const output = result.data.map((pull) => {
      return `${pull.number} ${pull.title}`;
    })

    console.log(output)


  });
  



program.parseAsync(process.argv);
