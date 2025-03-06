"use client";

import { Key, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

type Gathering = {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string | null;
  capacity: number;
  registrations: [
    {
      createdAt: string | number | Date;
      id: Key | null | undefined;
      status: string;
      member?: {
        id: number;
        name: string;
        contact: string;
      };
    }
  ];
  status: "ACTIVE" | "NOT_ACTIVE";
  _count?: {
    registrations: number;
  };
};

export default function ListDetails() {
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGatherings();

    const handleRegistrationUpdate = () => {
      console.log("Registration update detected, refreshing list...");
      fetchGatherings();
    };
    window.addEventListener("registration-updated", handleRegistrationUpdate);

    return () => {
      window.removeEventListener("registration-updated", handleRegistrationUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchGatherings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/gatherings/with-registrations");
      if (!response.ok) {
        throw new Error("Failed to fetch gatherings");
      }
      const data = await response.json();
      setGatherings(Array.isArray(data) ? data : []);
      console.log(gatherings);
    } catch (err) {
      console.error("Error fetching gatherings:", err);
      setError("Failed to load gatherings");
      setGatherings([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-10" id="list">
      <div className="col-span-2 col-start-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-5">List Pendaftaran</h2>
        {gatherings.length > 0 ? (
          <div>
            {gatherings.map((gathering) => (
              <Card key={gathering.id} className="mb-5">
                <CardHeader>
                  <h1 className="test-xl font-bold">
                    {gathering.name}{" "}
                    <span className="ml-2 text-muted-foreground">
                      ({gathering._count?.registrations || 0}/{gathering.capacity})
                    </span>
                  </h1>
                  <p>{gathering.description}</p>
                  <p>
                    Date:{" "}
                    {new Intl.DateTimeFormat("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(gathering.date))}
                  </p>
                  <h2>Prodiakon/Prodiakones Terdaftar:</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gathering.registrations.length > 0 ? (
                      <div className="flex items-start flex-col gap-4 rounded-lg border p-4">
                        {gathering.registrations.map((registration) => (
                          <div key={registration.id}>
                            <p className="font-medium leading-none">
                              {registration.member?.name} (Registered at:{" "}
                              {new Intl.DateTimeFormat("id-ID", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }).format(new Date(registration.createdAt))}
                              )
                            </p>
                            <p className="text-sm text-muted-foreground">{registration.member?.contact}</p>
                            <Badge
                              variant={
                                registration.status === "CONFIRMED"
                                  ? "default"
                                  : registration.status === "PENDING"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {registration.status}
                            </Badge>
                            <br />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Belum ada Prodiakon/Prodiakones terdaftar.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Belum ada Misa terdaftar.</p>
        )}
      </div>
    </div>
  );
}
