import { PencilIcon, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";

type DashboardStatsProps = {
  savingsGoal: {
    current: number;
    target: number;
  };
  monthlyBudget: {
    total: number;
    remaining: number;
  };
  savings: {
    amount: number;
    progress: number;
  };
  onUpdateSavingsGoal: (target: number) => void;
  onUpdateCurrentSavings: (amount: number) => void;
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  savingsGoal,
  monthlyBudget,
  savings,
  onUpdateSavingsGoal,
  onUpdateCurrentSavings,
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isEditingSavings, setIsEditingSavings] = useState(false);
  const [newGoal, setNewGoal] = useState(savingsGoal.target.toString());
  const [newSavings, setNewSavings] = useState(savingsGoal.current.toString());

  const progress = Math.min(
    Math.round((savingsGoal.current / savingsGoal.target) * 100),
    100
  );

  const handleGoalSubmit = () => {
    const value = parseFloat(newGoal);
    if (!isNaN(value) && value > 0) {
      onUpdateSavingsGoal(value);
    }
    setIsEditingGoal(false);
  };

  const handleSavingsSubmit = () => {
    const value = parseFloat(newSavings);
    if (!isNaN(value) && value >= 0) {
      onUpdateCurrentSavings(value);
    }
    setIsEditingSavings(false);
  };

  return (
    <div className="grid gap-4">
      {/* Objectif d'épargne */}
      <div className="p-4 border rounded-lg sm:p-6 bg-[#1A1F2E] border-blue-500/20">
        <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">
              Objectif d'épargne
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Dialog open={isEditingSavings} onOpenChange={setIsEditingSavings}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full px-4 text-sm border-gray-700 h-9 hover:bg-gray-700 sm:w-auto"
                >
                  <PencilIcon className="w-4 h-4 mr-3" />
                  Modifier épargne
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier l'épargne actuelle</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <Input
                    type="number"
                    value={newSavings}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewSavings(e.target.value)
                    }
                    placeholder="Montant actuel"
                    className="mb-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingSavings(false)}
                    className="h-10 px-6"
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleSavingsSubmit} className="h-10 px-6">
                    Sauvegarder
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isEditingGoal} onOpenChange={setIsEditingGoal}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full px-4 text-sm border-gray-700 h-9 hover:bg-gray-700 sm:w-auto"
                >
                  <PencilIcon className="w-4 h-4 mr-3" />
                  Modifier objectif
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier l'objectif</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <Input
                    type="number"
                    value={newGoal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewGoal(e.target.value)
                    }
                    placeholder="Objectif"
                    className="mb-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingGoal(false)}
                    className="h-10 px-6"
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleGoalSubmit} className="h-10 px-6">
                    Sauvegarder
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mb-2 text-base text-right sm:text-lg">
          <span className="text-blue-500">{savingsGoal.current}€</span>
          <span className="text-gray-400"> / {savingsGoal.target}€</span>
        </div>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-gray-400">
          {progress}% de l'objectif atteint
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Budget mensuel */}
        <div className="p-4 border rounded-lg sm:p-6 bg-[#1A1F2E] border-blue-500/20">
          <h3 className="text-sm font-medium text-gray-400">Budget mensuel</h3>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-blue-500 sm:text-3xl">
              {monthlyBudget.total}€
            </p>
            <p className="text-sm text-gray-400">
              Reste: {monthlyBudget.remaining}€
            </p>
          </div>
        </div>

        {/* Économies */}
        <div className="p-4 border rounded-lg sm:p-6 bg-[#1A1F2E] border-blue-500/20">
          <h3 className="text-sm font-medium text-gray-400">Économies</h3>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-green-500 sm:text-3xl">
              +{savings.amount}€
            </p>
            <p className="text-sm text-gray-400">vs mois dernier</p>
          </div>
        </div>
      </div>
    </div>
  );
};
