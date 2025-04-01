#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Récupérer le nom du module à partir des arguments de ligne de commande
const moduleName = process.argv[2];

if (!moduleName) {
  console.error('\x1b[31mErreur: Veuillez spécifier un nom de module.\x1b[0m');
  console.log('\x1b[36mUtilisation: npm run nest:generate <nom-du-module>\x1b[0m');
  process.exit(1);
}

// Chemin où le module sera créé
const modulePath = `modules/${moduleName}`;

try {
  console.log(`\x1b[36mCréation du module '${moduleName}'...\x1b[0m`);

  // Génération du module
  console.log('\x1b[36m1. Génération du module...\x1b[0m');
  execSync(`nest generate module ${modulePath}`, { stdio: 'inherit' });

  // Génération du service
  console.log('\x1b[36m2. Génération du service...\x1b[0m');
  execSync(`nest generate service ${modulePath}`, { stdio: 'inherit' });

  // Génération du contrôleur
  console.log('\x1b[36m3. Génération du contrôleur...\x1b[0m');
  execSync(`nest generate controller ${modulePath}`, { stdio: 'inherit' });

  // Création du répertoire dto
  console.log('\x1b[36m4. Création du répertoire dto...\x1b[0m');
  execSync(`mkdir -p src/${modulePath}/dto`, { stdio: 'inherit' });

  // Création du répertoire interfaces
  console.log('\x1b[36m5. Création du répertoire interfaces...\x1b[0m');
  execSync(`mkdir -p src/${modulePath}/interfaces`, { stdio: 'inherit' });

  // Génération de l'interface
  console.log('\x1b[36m6. Création de l\'interface...\x1b[0m');
  execSync(`nest generate interface ${modulePath}/interfaces`, { stdio: 'inherit' });

  console.log(`\x1b[32mModule '${moduleName}' créé avec succès !\x1b[0m`);
} catch (error) {
  console.error(`\x1b[31mErreur lors de la création du module '${moduleName}':\x1b[0m`, error.message);
  process.exit(1);
} 