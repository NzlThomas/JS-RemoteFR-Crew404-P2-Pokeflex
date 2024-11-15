# Barre de Recherche avec Navigation au Clavier

Implémentation d'une barre de recherche interactive en React avec TypeScript, offrant une fonctionnalité de recherche en temps réel et une navigation au clavier. Son rôle est de rechercher un pokémon par son nom.

## Fonctionnalités

- Recherche en temps réel
- La recherche est déclenchée à chaque frappe.
- Les résultats potentiels sont affichés sous la barre de recherche.
- Navigation dans les propositions de résultats avec les flèches du clavier
- Sélection du résultats par clic ou avec la touche Entrée
- Affichage/masquage dynamique de la liste des résultats potentiels

## Structure

1. `App.tsx` : Composant principal qui gère l'état global et la logique de l'application.

2. `SearchBar.tsx` : Composant de la barre de recherche qui gère l'entrée utilisateur et les requêtes de recherche. Envoie les résultats au composant parent.

3. `SearchResultsList.tsx` : Composant qui affiche la liste des potentiels résultats de recherche. Gère la sélection et le survol des résultats.

4. `SearchResult.tsx` : Composant individuel pour chaque potentiel résultat de recherche. Gère les interactions (clic, survol) pour un résultat spécifique.

## Prochaines étapes

- Modifier le CSS pour le faire correspondre à la charte graphique
- Gerer l'affichage des pokémons
- Faire en sorte que la SearchResultList se ferme avec échap ou en cliquant à coté quand on ne valide pas 