import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accueil.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AccueilComponent implements OnInit {
  appTitle = 'MinaPro';
  appLogo = '/logo-minapro.png';
  isAuthenticated = false;
  currentYear = new Date().getFullYear();
  
  constructor(
    private router: Router,
 
  ) {
   
  }
  // Pour l'animation du compteur
  animatedStats = [
    { value: 0, target: 70, suffix: '%', title: 'Gain de temps' },
    { value: 0, target: 100, suffix: '%', title: 'Données centralisées' },
    { value: 0, target: 3, suffix: 'x', title: 'Capacité de suivi' },
    { value: 0, target: 24, suffix: '/7', title: 'Disponibilité' }
  ];
  // router: any;

  ngOnInit() {
    this.animateCounters();
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }
 
  advantages = [
    {
      icon: 'rocket',
      title: 'Efficacité opérationnelle',
      description: 'Réduction de 70% du temps administratif grâce à l\'automatisation complète du suivi et du reporting',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'chart',
      title: 'Décisions basées sur les données',
      description: 'Tableaux de bord en temps réel pour des ajustements stratégiques immédiats et précis',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'star',
      title: 'Accompagnement d\'excellence',
      description: 'Suivi personnalisé et proactif impossible à reproduire avec des outils standards',
      color: 'from-orange-500 to-red-500'
    }
  ];

  features = [
    {
      icon: 'users',
      title: 'Gestion intégrée 360°',
      description: 'Une vision complète de chaque bénéficiaire',
      items: [
        'Profil complet bénéficiaire + entreprise',
        'Historique d\'accompagnement centralisé',
        'Segmentation automatique par maturité',
        'Documents et fichiers organisés'
      ],
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: 'trending',
      title: 'Performance en temps réel',
      description: 'Suivez l\'évolution de vos programmes',
      items: [
        'Évolution CA, emplois, marges',
        'Indicateurs ESG automatisés',
        'Tableaux de bord dynamiques',
        'Alertes personnalisables'
      ],
      color: 'bg-green-500/10 text-green-600'
    },
    {
      icon: 'file',
      title: 'Reporting automatisé',
      description: 'Générez des rapports professionnels en un clic',
      items: [
        'Export PDF/Excel avec graphiques',
        'Rapports bailleurs personnalisés',
        'Templates configurables',
        'Planification automatique'
      ],
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      icon: 'smartphone',
      title: 'Mobilité terrain',
      description: 'Collectez des données partout, même hors ligne',
      items: [
        'Formulaires optimisés mobile',
        'Mode hors-ligne avec sync',
        'Géolocalisation intégrée',
        'Photos et signatures'
      ],
      color: 'bg-orange-500/10 text-orange-600'
    },
    {
      icon: 'bell',
      title: 'Alertes intelligentes',
      description: 'Restez informé des situations critiques',
      items: [
        'Bénéficiaires inactifs détectés',
        'Entreprises en difficulté',
        'Dépassements budgétaires',
        'Échéances et rappels'
      ],
      color: 'bg-red-500/10 text-red-600'
    },
    {
      icon: 'dollar',
      title: 'Gestion budgétaire',
      description: 'Maîtrisez vos finances programme par programme',
      items: [
        'Exécution par bailleur',
        'Prévisions et projections',
        'Suivi des décaissements',
        'Rapports financiers détaillés'
      ],
      color: 'bg-emerald-500/10 text-emerald-600'
    }
  ];

  stats = [
    {
      value: '70%',
      title: 'Gain de temps',
      description: 'Réduction du temps passé sur les tâches administratives et le reporting',
      icon: 'clock'
    },
    {
      value: '100%',
      title: 'Données centralisées',
      description: 'Toutes les informations accessibles en un seul endroit, en temps réel',
      icon: 'database'
    },
    {
      value: '3x',
      title: 'Capacité de suivi',
      description: 'Triplement du nombre de bénéficiaires suivis efficacement par coach',
      icon: 'users'
    },
    {
      value: '24/7',
      title: 'Accès bénéficiaires',
      description: 'Portail en ligne permettant aux entrepreneurs de suivre leur progression',
      icon: 'globe'
    }
  ];

  testimonials = [
    {
      text: 'MinaPro a transformé notre façon de travailler. Nous avons divisé par trois le temps passé sur le reporting.',
      author: 'Fatou Diop',
      role: 'Directrice Programme',
      avatar: '👩🏾‍💼'
    },
    {
      text: 'L\'interface mobile nous permet de collecter des données terrain de qualité, même sans connexion internet.',
      author: 'Mamadou Seck',
      role: 'Coach Terrain',
      avatar: '👨🏿‍💼'
    },
    {
      text: 'Les tableaux de bord en temps réel nous donnent une visibilité sans précédent sur l\'impact de nos actions.',
      author: 'Aïcha Kane',
      role: 'Responsable M&E',
      avatar: '👩🏾‍💻'
    }
  ];

  animateCounters() {
    this.animatedStats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.target / steps;
      let current = 0;
      
      setTimeout(() => {
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            stat.value = stat.target;
            clearInterval(timer);
          } else {
            stat.value = Math.floor(current);
          }
        }, duration / steps);
      }, index * 200);
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}