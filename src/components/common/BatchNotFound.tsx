import { Card, CardContent } from "../ui/Card";

export const BatchNotFound = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Batch not found</p>
        </CardContent>
      </Card>
    </div>
  );
};
