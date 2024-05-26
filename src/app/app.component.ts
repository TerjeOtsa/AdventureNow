import { Component, OnInit } from '@angular/core';
import { ActivityService } from './services/activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // Ensure this file exists in the same directory
  styleUrls: ['./app.component.scss']   // Ensure this file exists in the same directory
})
export class AppComponent implements OnInit {
  activity: string = '';  // Provide a default value
  suggestions: string[] = [];
  timeValue = 30;
  intensityValue = 5;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.loadCityActivities();
  }

  updateTimeValue(event: any) {
    this.timeValue = event.target.value;
  }

  updateIntensityValue(event: any) {
    this.intensityValue = event.target.value;
  }

  randomizeActivity() {
    this.activityService.randomizeActivity(this.timeValue, this.intensityValue, this.getSelectedCity())
      .subscribe(data => {
        this.activity = data.activity;
      });
  }

  addActivity(activityName: string, activityTime: number, activityIntensity: number) {
  this.activityService.addActivity(activityName, activityTime, activityIntensity, this.getSelectedCity())
    .subscribe(data => {
      alert(data.message);
    });
}


  removeActivity(activityToRemove: string) {
    this.activityService.removeActivity(activityToRemove, this.getSelectedCity())
      .subscribe(data => {
        alert(data.message);
      });
  }

  suggestActivities(query: string) {
    this.activityService.suggestActivities(query, this.getSelectedCity())
      .subscribe(data => {
        this.suggestions = data;
      });
  }

  loadCityActivities() {
    const city = this.getSelectedCity();
    this.activityService.suggestActivities('', city)
      .subscribe(data => {
        // handle loaded activities
      });
  }

  getSelectedCity(): string {
    const citySelector = document.getElementById('citySelector') as HTMLSelectElement;
    return citySelector.value;
  }

  selectSuggestion(suggestion: string) {
    const activityToRemove = document.getElementById('activityToRemove') as HTMLInputElement;
    activityToRemove.value = suggestion;
    this.suggestions = [];
  }
}
