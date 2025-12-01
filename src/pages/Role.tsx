import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Truck, Store, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
// import { useGetRole } from "@/hooks/contracts/useGetRoles";

const roles = [
  {
    id: "producer",
    label: "Producer",
    icon: Sprout,
    gradient: "from-green-500 to-emerald-500",
    description: "Create and manage food batches from farm origin",
  },
  {
    id: "processor",
    label: "Processor",
    icon: Truck,
    gradient: "from-blue-500 to-cyan-500",
    description: "Track and verify batch transportation",
  },
  {
    id: "retailer",
    label: "Retailer",
    icon: Store,
    gradient: "from-yellow-500 to-orange-500",
    description: "Confirm deliveries and manage inventory",
  },
  {
    id: "consumer",
    label: "Consumer",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
    description: "Scan QR codes and view product history",
  },
];

const Roles = () => {
  const [selectedRole, setSelectedRole] = useState("producer");
  // const { roles: roleData } = useGetRole();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage permissions and actions for different supply chain roles
        </p>
      </div>

      <Tabs
        value={selectedRole}
        onValueChange={setSelectedRole}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 gap-4 bg-transparent h-auto p-0">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = selectedRole === role.id;

            return (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className="data-[state=active]:bg-transparent p-0 h-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <div
                    className={`relative group ${
                      isActive ? "ring-2 ring-primary" : ""
                    } rounded-xl`}
                  >
                    <div
                      className={`absolute -inset-0.5 bg-linear-to-r ${
                        role.gradient
                      } rounded-xl opacity-0 ${
                        isActive ? "opacity-100" : "group-hover:opacity-50"
                      } blur transition-opacity duration-300`}
                    />
                    <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-linear-to-br ${role.gradient} mb-3`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold">{role.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {roles.map((role) => (
          <TabsContent key={role.id} value={role.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <div
                className={`absolute -inset-0.5 bg-linear-to-r ${role.gradient} opacity-0 group-hover:opacity-30 rounded-2xl blur transition-opacity duration-500`}
              />
              <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {role.label} Dashboard
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Permissions
                    </h3>
                    <ul className="space-y-2">
                      {role.id === "producer" && (
                        <>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Create new batches
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            View owned batches
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Update batch status
                          </li>
                        </>
                      )}
                      {role.id === "distributor" && (
                        <>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Verify batch authenticity
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Update location status
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Track shipments
                          </li>
                        </>
                      )}
                      {role.id === "retailer" && (
                        <>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Confirm deliveries
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Mark products as sold
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Manage inventory
                          </li>
                        </>
                      )}
                      {role.id === "consumer" && (
                        <>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Scan QR codes
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            View product history
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Download trace reports
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-card/30 rounded-lg p-4 border border-border/30">
                        <p className="text-sm font-medium">
                          No recent activity
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Activity will appear here once you start using this
                          role
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Roles;
