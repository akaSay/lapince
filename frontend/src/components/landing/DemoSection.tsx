import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  LineChart,
  PiggyBank,
  Target,
  Wallet,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const DemoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-4 sm:p-6 bg-[#1E2536]/80 rounded-xl border border-blue-500/20"
    >
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="expenses"
            className="flex items-center justify-center gap-2 sm:justify-start"
          >
            <PiggyBank className="w-4 h-4" />
            <span className="hidden sm:inline">Dépenses</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center justify-center gap-2 sm:justify-start"
          >
            <LineChart className="w-4 h-4" />
            <span className="hidden sm:inline">Analyses</span>
          </TabsTrigger>
          <TabsTrigger
            value="budget"
            className="flex items-center justify-center gap-2 sm:justify-start"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Budget</span>
          </TabsTrigger>
        </TabsList>

        {/* Onglet Dépenses */}
        <TabsContent value="expenses" className="mt-4">
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#1A1F2E] rounded-lg">
            <div className="flex items-center justify-between p-3 border rounded-lg border-blue-500/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <PiggyBank className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">Courses</p>
                  <p className="text-xs text-gray-400">Carrefour</p>
                </div>
              </div>
              <span className="text-sm font-medium text-red-400">-85.50 €</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg border-blue-500/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <ArrowDown className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">Salaire</p>
                  <p className="text-xs text-gray-400">Entreprise XYZ</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-400">
                +2500.00 €
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg border-blue-500/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <ArrowUp className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-white">Loyer</p>
                  <p className="text-xs text-gray-400">Appartement</p>
                </div>
              </div>
              <span className="text-sm font-medium text-red-400">
                -800.00 €
              </span>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Analyses */}
        <TabsContent value="analytics" className="mt-4">
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#1A1F2E] rounded-lg">
            <div className="h-[200px] sm:h-48 p-3 sm:p-4 border rounded-lg border-blue-500/20">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-white">
                  Dépenses par catégorie
                </h3>
                <span className="text-xs text-gray-400">Dernier mois</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-full h-4 overflow-hidden rounded-full bg-blue-500/10">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 min-w-[90px]">
                    45% Logement
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-4 overflow-hidden rounded-full bg-blue-500/10">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "30%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 min-w-[90px]">
                    30% Courses
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-4 overflow-hidden rounded-full bg-blue-500/10">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "25%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 min-w-[90px]">
                    25% Loisirs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Budget */}
        <TabsContent value="budget" className="mt-4">
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#1A1F2E] rounded-lg">
            <div className="p-3 border rounded-lg sm:p-4 border-blue-500/20">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-medium text-white">
                    Objectif d'épargne
                  </h3>
                </div>
                <span className="text-sm font-medium text-blue-400">
                  500€ / 1000€
                </span>
              </div>
              <div className="w-full h-2 mb-2 overflow-hidden rounded-full bg-blue-500/10">
                <div className="h-full bg-blue-500" style={{ width: "50%" }} />
              </div>
              <p className="text-xs text-gray-400">50% de l'objectif atteint</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="p-3 border rounded-lg sm:p-4 border-blue-500/20">
                <h4 className="mb-2 text-sm font-medium text-white">
                  Budget mensuel
                </h4>
                <p className="text-xl font-bold text-blue-400 sm:text-2xl">
                  3500€
                </p>
                <p className="text-xs text-gray-400">Reste: 1200€</p>
              </div>
              <div className="p-3 border rounded-lg sm:p-4 border-blue-500/20">
                <h4 className="mb-2 text-sm font-medium text-white">
                  Économies
                </h4>
                <p className="text-xl font-bold text-green-400 sm:text-2xl">
                  +15%
                </p>
                <p className="text-xs text-gray-400">vs mois dernier</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
