import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
  
    ngOnInit(): void {

      const scripts = [
        'assets/vendor/js/menu.js',
        'assets/vendor/js/helpers.js',
        'assets/js/main.js'
        
        
      ];
      scripts.forEach(scriptPath => {
      const script = document.createElement('script');
      script.src = scriptPath;

      script.onload = () => {
        console.log('Script chargé avec succès !');
        // Exécuter du code après le chargement du script, si nécessaire
      };
  
      script.onerror = (error) => {
        console.error('Erreur lors du chargement du script:', error);
        // Afficher un message d'erreur à l'utilisateur
      };
  
      document.body.appendChild(script);
    });
  }

}
