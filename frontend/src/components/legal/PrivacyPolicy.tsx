export const PrivacyPolicy = () => {
  return (
    <div className="space-y-4 text-left">
      <h2 className="text-2xl font-bold text-white">
        Politique de Confidentialité
      </h2>
      <div className="space-y-4 text-gray-400">
        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2">
            1. Collecte des Informations
          </h3>
          <p>
            Nous collectons uniquement les informations nécessaires pour fournir
            nos services :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Informations de compte (email, nom d'utilisateur)</li>
            <li>Données de budget et transactions (chiffrées)</li>
            <li>Préférences utilisateur</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2">
            2. Utilisation des Données
          </h3>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Assurer la sécurité de votre compte</li>
          </ul>
        </section>

        {/* Ajoutez d'autres sections selon vos besoins */}
      </div>
    </div>
  );
};
