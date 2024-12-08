export const TermsOfService = () => {
  return (
    <div className="space-y-4 text-left">
      <h2 className="text-2xl font-bold text-white">
        Conditions d'Utilisation
      </h2>
      <div className="space-y-4 text-gray-400">
        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2">
            1. Acceptation des Conditions
          </h3>
          <p>
            En utilisant LaPince, vous acceptez ces conditions d'utilisation
            dans leur intégralité.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2">
            2. Utilisation du Service
          </h3>
          <p>Vous vous engagez à :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Fournir des informations exactes</li>
            <li>Protéger vos identifiants de connexion</li>
            <li>Utiliser le service de manière légale</li>
          </ul>
        </section>

        {/* Ajoutez d'autres sections selon vos besoins */}
      </div>
    </div>
  );
};
