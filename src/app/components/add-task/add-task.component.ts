import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  showForm!: boolean;
  subscription!: Subscription;

  @ViewChild('Addform') form!: NgForm;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showForm = value));
  }

  onSubmit() {
    console.log(this.form);

    if (this.form.valid === null || !this.form.valid) {
      alert('Please add a task');
      return;
    }

    const newTask: Task = {
      text: this.form.value.text,
      day: this.form.value.day,
      reminder: this.form.value.reminder,
    };

    this.onAddTask.emit(newTask);

    this.form.reset();
  }
}
