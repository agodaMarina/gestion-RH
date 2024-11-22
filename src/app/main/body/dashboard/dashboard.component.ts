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
  user:User = {};
  todo:Todo={"title":"","description":"", "completed":false};
  constructor(private service:AuthenticationService,private todoService:TodoService) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/dashboards-analytics.js';
    document.body.appendChild(script);
    this.getProfile();
  }

getProfile(){
this.service.getProfile().subscribe({
  next:(data)=>{
    this.user=data
  },
  error:(err)=>{
    console.log(err)
  }
});
}

todos: Todo[] = [];

getTodos() {
  this.todoService.getTodos().subscribe({
    next: (data) => {
      this.todos = data;
    },
    error: (err) => {
      console.log(err);
    }
  });
}

addTodo() {
  this.todoService.createTodo(this.todo).subscribe({
    next: (data) => {
      this.getTodos();
    },
    error: (err) => {
      console.log(err);
    }
  });
}

updateTodo(todo: any) {
  this.todoService.updateTodo(todo).subscribe({
    next: (data) => {
      const index = this.todos.findIndex(t => t.id === data.id);
      if (index !== -1) {
        this.todos[index] = data;
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}

deleteTodo(id: number) {
  this.todoService.deleteTodo(id).subscribe({
    next: () => {
      this.todos = this.todos.filter(t => t.id !== id);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
