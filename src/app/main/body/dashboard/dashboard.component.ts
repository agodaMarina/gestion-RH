import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models/user';
import { AuthenticationService } from '../../../api/services/authentication.service';
import { TodoService } from '../../../api/services/todo.service';
import { Todo } from '../../../api/models/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: User = {};
  todo: Todo = { title: '', description: '', completed: false };
  currentDate: Date = new Date();
  weeks: (number | null)[][] = [];
  monthName: string = '';
  daysInMonth: number = 0;
  constructor(
    private service: AuthenticationService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/dashboards-analytics.js';
    document.body.appendChild(script);
    this.getProfile();
    this.generateCalendar();
  }

  getProfile() {
    this.service.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // todos: Todo[] = [];

  // getTodos() {
  //   this.todoService.getTodos().subscribe({
  //     next: (data) => {
  //       this.todos = data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  // addTodo() {
  //   this.todoService.createTodo(this.todo).subscribe({
  //     next: (data) => {
  //       this.getTodos();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  // updateTodo(todo: any) {
  //   this.todoService.updateTodo(todo).subscribe({
  //     next: (data) => {
  //       const index = this.todos.findIndex(t => t.id === data.id);
  //       if (index !== -1) {
  //         this.todos[index] = data;
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  // deleteTodo(id: number) {
  //   this.todoService.deleteTodo(id).subscribe({
  //     next: () => {
  //       this.todos = this.todos.filter(t => t.id !== id);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Trouver le premier jour de la semaine (dimanche = 0)
    const firstDayIndex = firstDay.getDay();

    // Créer les jours du mois
    const allDays: (number | null)[] = Array(firstDayIndex).fill(null); // Jours vides avant le début du mois
    for (let day = 1; day <= lastDay.getDate(); day++) {
      allDays.push(day);
    }

    // Ajouter des jours vides à la fin pour compléter la dernière semaine
    while (allDays.length % 7 !== 0) {
      allDays.push(null);
    }

    // Découper les jours en semaines
    this.weeks = [];
    while (allDays.length) {
      this.weeks.push(allDays.splice(0, 7));
    }

    // Mettre à jour le nom du mois
    this.monthName = this.currentDate.toLocaleString('default', {
      month: 'long',
    });
  }

  // Passe au mois précédent
  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  // Passe au mois suivant
  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  // Vérifie si une date correspond à aujourd'hui
  isToday(day: number | null): boolean {
    if (!day) return false; // Si le jour est null, ce n'est pas aujourd'hui
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }
}
