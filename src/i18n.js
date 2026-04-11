import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "articles": "Articles",
        "users": "Users",
        "categories": "Categories",
        "comments": "Comments",
        "logout": "Logout",
        "login": "Login",
        "back_to_all": "BACK TO ALL ARTICLES"
      },
      "auth": {
        "login_title": "Login to your account",
        "email_placeholder": "Email",
        "password_placeholder": "Password",
        "login_button": "Login",
        "logging_in": "Logging in...",
        "failed": "Login failed"
      },
      "public": {
        "hero_tagline": "KNOWLEDGE BASE",
        "hero_title": "Read. Learn. Build.",
        "hero_desc": "Hand-crafted guides, insights, and resources to help you master new skills and build better software.",
        "search_placeholder": "Search articles...",
        "save": "Save",
        "saved": "Saved",
        "view_saved": "View My Saved Articles",
        "showing_saved": "Showing Saved Articles",
        "latest_articles": "Latest Articles",
        "saved_library": "Your Saved Library",
        "no_saved": "You haven't saved any articles yet.",
        "no_saved_desc": "Click the Save button on any article to add it to your library.",
        "comments_title": "Discussion",
        "leave_comment": "Leave a comment",
        "post_comment": "Post Comment",
        "posting": "Posting...",
        "anonymous": "Anonymous",
        "no_comments": "No comments yet. Be the first to share your thoughts!"
      },
      "admin": {
        "articles_title": "Articles Management",
        "users_title": "Users Management",
        "categories_title": "Categories Management",
        "comments_title": "Comments Management",
        "new_article": "New Article",
        "new_user": "New User",
        "new_category": "New Category",
        "search_user": "Search for a user...",
        "search_article": "Search for an article...",
        "edit": "Edit",
        "delete": "Delete",
        "validate": "Validate",
        "reject": "Reject",
        "save_changes": "Save Changes",
        "cancel": "Cancel",
        "save": "Save",
        "add": "Add",
        "role": "Role",
        "domain": "Domain",
        "technician": "Technician",
        "administrator": "Administrator",
        "status_validated": "Validated",
        "status_pending": "Pending",
        "add_article_desc": "Add, validate and organize your base",
        "title_placeholder": "Title",
        "desc_placeholder": "Short description",
        "content_placeholder": "Content",
        "categories_select": "Categories (Select one or more)",
        "add_success": "Success",
        "update_success": "Updated successfully",
        "user_name_placeholder": "Full Name",
        "category_name_placeholder": "Category Name",
        "admin_only": "Reserved for administrators",
        "edit_role": "Update Role",
        "update_role_for": "Update role for",
        "choose_domain": "Choose a domain",
        "optional": "Optional"
      },
      "categories": {
        "title": "Manage Categories",
        "add_new": "Add New Category",
        "name_placeholder": "Category Name...",
        "delete_confirm": "Are you sure you want to delete this category?"
      },
      "comments": {
        "title": "Manage Comments",
        "delete_confirm": "Delete this comment?",
        "author": "Author",
        "date": "Date"
      },
      "common": {
        "loading": "Loading...",
        "error": "An error occurred",
        "success": "Action successful",
        "previous": "Previous",
        "next": "Next",
        "page": "Page"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "articles": "Articles",
        "users": "Utilisateurs",
        "categories": "Catégories",
        "comments": "Commentaires",
        "logout": "Déconnexion",
        "login": "Connexion",
        "back_to_all": "RETOUR AUX ARTICLES"
      },
      "auth": {
        "login_title": "Connexion à votre compte",
        "email_placeholder": "Email",
        "password_placeholder": "Mot de passe",
        "login_button": "Connexion",
        "logging_in": "Connexion en cours...",
        "failed": "Erreur de connexion"
      },
      "public": {
        "hero_tagline": "BASE DE CONNAISSANCES",
        "hero_title": "Lire. Apprendre. Construire.",
        "hero_desc": "Guides, insights et ressources pour vous aider à maîtriser de nouvelles compétences.",
        "search_placeholder": "Rechercher des articles...",
        "save": "Enregistrer",
        "saved": "Enregistré",
        "view_saved": "Voir mes articles sauvegardés",
        "showing_saved": "Articles sauvegardés affichés",
        "latest_articles": "Derniers Articles",
        "saved_library": "Votre Bibliothèque Sauvegardée",
        "no_saved": "Vous n'avez pas encore d'articles sauvegardés.",
        "no_saved_desc": "Cliquez sur le bouton Enregistrer pour ajouter un article à votre bibliothèque.",
        "comments_title": "Discussion",
        "leave_comment": "Laisser un commentaire",
        "post_comment": "Poster le commentaire",
        "posting": "Envoi...",
        "anonymous": "Anonyme",
        "no_comments": "Pas encore de commentaires. Soyez le premier à partager votre avis !"
      },
      "admin": {
        "articles_title": "Gestion des Articles",
        "users_title": "Gestion des Utilisateurs",
        "categories_title": "Gestion des Catégories",
        "comments_title": "Gestion des Commentaires",
        "new_article": "Nouvel Article",
        "new_user": "Nouvel Utilisateur",
        "new_category": "Nouvelle Catégorie",
        "search_user": "Rechercher un utilisateur...",
        "search_article": "Rechercher un article...",
        "edit": "Modifier",
        "delete": "Supprimer",
        "validate": "Valider",
        "reject": "Refuser",
        "save_changes": "Enregistrer les modifications",
        "cancel": "Annuler",
        "save": "Enregistrer",
        "add": "Ajouter",
        "role": "Rôle",
        "domain": "Domaine",
        "technician": "Technicien",
        "administrator": "Administrateur",
        "status_validated": "Validé",
        "status_pending": "En attente",
        "add_article_desc": "Ajouter, valider et organiser votre base",
        "title_placeholder": "Titre",
        "desc_placeholder": "Description courte",
        "content_placeholder": "Contenu",
        "categories_select": "Catégories (Sélectionnez une ou plusieurs)",
        "add_success": "Réussi",
        "update_success": "Mis à jour avec succès",
        "user_name_placeholder": "Nom complet",
        "category_name_placeholder": "Nom de la catégorie",
        "admin_only": "Accès réservé aux administrateurs",
        "edit_role": "Modifier le rôle",
        "update_role_for": "Modifier le rôle pour",
        "choose_domain": "Choisir un domaine",
        "optional": "Optionnel"
      },
      "categories": {
        "title": "Gérer les Catégories",
        "add_new": "Ajouter une catégorie",
        "name_placeholder": "Nom de la catégorie...",
        "delete_confirm": "Voulez-vous vraiment supprimer cette catégorie ?"
      },
      "comments": {
        "title": "Gérer les Commentaires",
        "delete_confirm": "Supprimer ce commentaire ?",
        "author": "Auteur",
        "date": "Date"
      },
      "common": {
        "loading": "Chargement...",
        "error": "Une erreur est survenue",
        "success": "Action réussie",
        "previous": "Précédent",
        "next": "Suivant",
        "page": "Page"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
