import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  template: `
    <div class="container" *ngIf="country && !showResultButton">
  <h2>Which country has a capital city {{ country.capital }}?</h2>
  <p>Question {{ questionNumber }} of 10</p>
  <p>Time to respond: {{ timeLeft }} sec.</p>
  <ul>
    <li *ngFor="let option of answerOptions">
      <button (click)="checkAnswer(option.name.common)">{{ option.name.common }}</button>
    </li>
  </ul>
  <div class="button-container">
    <button class="special-button" (click)="showResult()">Finish and show the result</button>
  </div>
</div>

<button class="special-button1" *ngIf="showResultButton" (click)="showResult()">Show result</button>


  `,
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  country: any;
  answerOptions: any[] = [];
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  questionNumber: number = 0;
  
  showResultButton: boolean = false;
  timeLeft: number = 15; 
  interval: any; 
  isTimeout: boolean = false; 
  selectedDifficulty: any;

  constructor(private apiService: ApiService, private router: Router) { }

  difficultyConfig: { [key: string]: number } = {
    easy: 30,
    medium: 15,
    hard: 10
  };

  ngOnInit(): void {
    const { difficulty } = history.state; 
    if (difficulty) {
      this.selectedDifficulty = difficulty;
      this.timeLeft = this.difficultyConfig[this.selectedDifficulty];
    }
    this.getNextQuestion();
  }

  getNextQuestion(): void {
    this.isTimeout = false;
  
    if (this.questionNumber >= 10) {
      this.showResultButton = true; 
      return;
    }
  
    this.apiService.getRandomCountries(3).subscribe(
      (countries) => {
        this.country = countries[0];
        this.answerOptions = this.apiService.shuffleArray(countries.slice(1));
        const randomIndex = Math.floor(Math.random() * 3);
        this.answerOptions.splice(randomIndex, 0, this.country);
        this.questionNumber++;
  
        this.timeLeft = this.difficultyConfig[this.selectedDifficulty];
        this.interval = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            this.isTimeout = true; 
            this.checkAnswer(null); 
          }
        }, 1000);
      },
      (error) => {
        console.error('Error getting random countries:', error);
      }
    );
  }
  
  

  checkAnswer(answer: string | null): void {
    clearInterval(this.interval);
  
    if (!this.isTimeout) {
      if (answer === this.country.name.common) {
        alert('That is right! Congratulations!');
        this.correctAnswers++;
      } else {
        alert(`Wrong! The correct answer is: ${this.country.name.common}`);
      }
      this.totalQuestions++;
    } else {
      alert('The time to respond has passed!'); 
      this.totalQuestions++;
    }
  
    localStorage.setItem('gameResult', JSON.stringify({ correctAnswers: this.correctAnswers, totalQuestions: this.totalQuestions }));
  
    this.getNextQuestion();
  }
  showResult(): void {
    clearInterval(this.interval); 
    this.router.navigate(['result']);
  }
  
}
