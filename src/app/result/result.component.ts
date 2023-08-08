import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result',
  template: `
    <div class="result-container">
      <h2>Game results</h2>
      <p>Number of correct answers: {{ correctAnswers }}</p>
      <p>Percentage of correct answers: {{ (correctAnswers / totalQuestions) * 100 | number: '1.0-1' }}%</p>
      <button (click)="restartGame()">Restart</button>
    </div>
  `,
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  correctAnswers: number = 0;
  totalQuestions: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const resultData = JSON.parse(localStorage.getItem('gameResult') || '{}');
    this.correctAnswers = resultData.correctAnswers || 0;
    this.totalQuestions = resultData.totalQuestions || 0;
  }

  restartGame(): void {
    localStorage.removeItem('gameResult');
    this.router.navigate(['/']);
  }
}
