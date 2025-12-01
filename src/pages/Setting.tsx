import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { motion } from "framer-motion";
import { Activity, Shield, Zap } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your blockchain traceability platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
          <Card className="relative bg-glass-gradient backdrop-blur-xl border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Verification Settings</CardTitle>
                  <CardDescription>
                    Manage verification thresholds
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-verify">Auto-verify deliveries</Label>
                <Switch id="auto-verify" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="require-signature">
                  Require digital signatures
                </Label>
                <Switch id="require-signature" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="multi-verify">Multiple verifications</Label>
                <Switch id="multi-verify" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-linear-to-r from-secondary/30 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
          <Card className="relative bg-glass-gradient backdrop-blur-xl border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Gas Usage Statistics</CardTitle>
                  <CardDescription>Monitor blockchain costs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Average Gas Used
                </span>
                <span className="font-mono text-primary">0.0024 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Transactions
                </span>
                <span className="font-mono text-secondary">3,849</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Monthly Cost
                </span>
                <span className="font-mono">$127.50</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group md:col-span-2"
        >
          <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
          <Card className="relative bg-glass-gradient backdrop-blur-xl border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-pink-500">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Role Access Control</CardTitle>
                  <CardDescription>
                    Manage permissions for each role
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Role
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                        Create
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                        Update
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                        Verify
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        role: "Producer",
                        create: true,
                        update: true,
                        verify: false,
                        view: true,
                      },
                      {
                        role: "Distributor",
                        create: false,
                        update: true,
                        verify: true,
                        view: true,
                      },
                      {
                        role: "Retailer",
                        create: false,
                        update: true,
                        verify: false,
                        view: true,
                      },
                      {
                        role: "Consumer",
                        create: false,
                        update: false,
                        verify: false,
                        view: true,
                      },
                    ].map((item) => (
                      <tr key={item.role} className="border-b border-border/30">
                        <td className="py-3 px-4 font-medium">{item.role}</td>
                        <td className="py-3 px-4 text-center">
                          <Switch
                            checked={item.create}
                            disabled={!item.create}
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Switch
                            checked={item.update}
                            disabled={!item.update}
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Switch
                            checked={item.verify}
                            disabled={!item.verify}
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Switch checked={item.view} disabled />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
