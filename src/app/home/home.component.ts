import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
  <h1>Welcome to the Geography game!</h1>
  <form (submit)="startGame()">
    <div class="form-group">
      <label for="difficulty">Choose a difficulty level:</label>
      <select name="difficulty" #difficultySelect>
        <option value="easy">Easy (30 sec.)</option>
        <option value="medium">Medium (15 sec.)</option>
        <option value="hard">Difficult (10 sec.)</option>
      </select>
    </div>
    <button type="submit">Start the game</button>
  </form>
</div>

  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('difficultySelect') difficultySelect: any;
  selectedDifficulty: string = 'easy'; 

  constructor(private router: Router) { }

  startGame(): void {
    this.selectedDifficulty = this.difficultySelect.nativeElement.value;
    this.router.navigate(['/question'], { state: { difficulty: this.selectedDifficulty } });
  }
}
