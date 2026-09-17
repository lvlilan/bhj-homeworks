const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

let pollId;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    const poll = data.data;

    pollId = data.id;

    pollTitle.textContent = poll.title;

    pollAnswers.innerHTML = '';

    poll.answers.forEach(function (answer, index) {
        const button = document.createElement('button');
        button.className = 'poll__answer';
        button.textContent = answer;

        button.addEventListener('click', function () {
            alert('Спасибо, ваш голос засчитан!');
            sendVote(index);
        });

        pollAnswers.appendChild(button);
    });
};

xhr.send();

function sendVote(answerIndex) {
    const voteXhr = new XMLHttpRequest();
    voteXhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    voteXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    voteXhr.onload = function () {
        const stat = JSON.parse(voteXhr.responseText).stat;

        pollAnswers.innerHTML = '';

        const totalVotes = stat.reduce(function (sum, item) {
            return sum + item.votes;
        }, 0);

        stat.forEach(function (item) {
            const percent = (item.votes / totalVotes * 100).toFixed(2);

            const result = document.createElement('div');
            result.className = 'poll__answer';
            result.textContent = item.answer + ': ' + percent + '%';

            pollAnswers.appendChild(result);
        });
    };

    voteXhr.send('vote=' + pollId + '&answer=' + answerIndex);
}