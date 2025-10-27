import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from 'src/app/domain/task';
import * as TasksActions from '../../../store/tasks/tasks.actions';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit?: Task;

  form: FormGroup = this.fb.group({
  titre: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
  description: this.fb.control('', { nonNullable: true }),
  priorite: this.fb.control(3, { validators: [Validators.min(1), Validators.max(5)], nonNullable: true }),
  dueDate: this.fb.control<string | undefined>(undefined),
  email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }) // ajouté
});


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnChanges() {
    if (this.taskToEdit) {
      this.form.patchValue(this.taskToEdit);
    }
  }

  save() {
    if (this.form.invalid) return;

    const email = this.dataService.currentEmail || localStorage.getItem('userEmail');

    if (!email) {
      alert('Email non défini. Veuillez vous reconnecter.');
      this.router.navigate(['/login']);
      return;
    }

    const values = this.form.value;

    const task: Task = {
      id: this.taskToEdit ? this.taskToEdit.id : uuidv4(),
      titre: values.titre,
      description: values.description,
      priorite: values.priorite,
      dueDate: values.dueDate || undefined,
      completed: this.taskToEdit?.completed || false,
      createdAt: this.taskToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userEmail: email
    };

    if (this.taskToEdit) {
      this.store.dispatch(TasksActions.updateTask({ task }));
    } else {
      this.store.dispatch(TasksActions.addTask({ task }));
    }

    // 🔹 Réinitialiser le formulaire
    this.form.reset({ priorite: 3 });

    // 🔹 Rediriger vers la liste des tâches après ajout
    this.router.navigate(['/tasks']);
  }
}
