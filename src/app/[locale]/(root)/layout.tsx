import MainLayout from "@/src/components/templates/main-layout";
import { ReactNode } from "react";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function RootLayout({
    children,
    params,
}: Props) {
    const { locale } = await params;

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}