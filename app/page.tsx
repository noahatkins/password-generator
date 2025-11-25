"use client";

import {useState, useCallback, useEffect, useRef, startTransition} from "react";
import Script from "next/script";
import Link from "next/link";
import {Copy, RefreshCw, Check, Github} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Slider} from "@/components/ui/slider";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {generateRandomPassword, generateMemorablePassword, type PasswordOptions} from "@/lib/password-generator";

type PasswordType = "random" | "memorable";

export default function Home() {
  const [passwordType, setPasswordType] = useState<PasswordType>("memorable");
  const [length, setLength] = useState([24]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const options: PasswordOptions = {
      length: length[0],
      includeNumbers,
      includeSymbols,
    };
    return passwordType === "random" ? generateRandomPassword(options) : generateMemorablePassword(options);
  }, [passwordType, length, includeNumbers, includeSymbols]);

  const [password, setPassword] = useState("");
  const hasInitialized = useRef(false);

  // Generate password only on client side to avoid hydration mismatch
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const options: PasswordOptions = {
        length: 24,
        includeNumbers: true,
        includeSymbols: true,
      };
      // Use startTransition to defer the state update and avoid hydration mismatch
      // This is necessary because we need client-side only password generation
      startTransition(() => {
        setPassword(generateMemorablePassword(options));
      });
    }
    // This effect is necessary to avoid hydration mismatch
    // The empty dependency array is intentional - we only want to run this once on mount
  }, []); // Only run on mount to generate initial password

  const handleRefresh = () => {
    setPassword(generatePassword());
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTabChange = (value: string) => {
    const newType = value as PasswordType;
    setPasswordType(newType);
    const options: PasswordOptions = {
      length: length[0],
      includeNumbers,
      includeSymbols,
    };
    setPassword(newType === "random" ? generateRandomPassword(options) : generateMemorablePassword(options));
  };

  const handleLengthChange = (value: number[]) => {
    setLength(value);
    const options: PasswordOptions = {
      length: value[0],
      includeNumbers,
      includeSymbols,
    };
    setPassword(passwordType === "random" ? generateRandomPassword(options) : generateMemorablePassword(options));
  };

  const handleNumberToggle = (checked: boolean) => {
    setIncludeNumbers(checked);
    const options: PasswordOptions = {
      length: length[0],
      includeNumbers: checked,
      includeSymbols,
    };
    setPassword(passwordType === "random" ? generateRandomPassword(options) : generateMemorablePassword(options));
  };

  const handleSymbolToggle = (checked: boolean) => {
    setIncludeSymbols(checked);
    const options: PasswordOptions = {
      length: length[0],
      includeNumbers,
      includeSymbols: checked,
    };
    setPassword(passwordType === "random" ? generateRandomPassword(options) : generateMemorablePassword(options));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Password Generator",
    description: "Generate secure, random, and memorable passwords for your accounts. Free, open-source password generator with customizable options.",
    url: "https://passgen.noahatkins.com",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Noah Atkins",
    },
    featureList: ["Random password generation", "Memorable password generation", "Customizable password length (8-64 characters)", "Optional numbers and symbols", "Copy to clipboard", "Open source"],
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
      <main className="min-h-screen flex items-center justify-center p-4 bg-background relative">
        {/* Header with theme toggle and GitHub link */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Link href="https://github.com/noahatkins/password-generator" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Password Generator</h1>
            <p className="text-muted-foreground">Create secure passwords for your accounts</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generated Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Display */}
              <div className="flex items-center gap-2">
                <div className="flex-1 p-4 bg-muted rounded-md border font-mono text-lg break-all min-h-[4rem] flex items-center">{password || <span className="text-muted-foreground/50">Generating password...</span>}</div>
                <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy password">
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Generate new password">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              {/* Tabs */}
              <Tabs value={passwordType} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="random">Random</TabsTrigger>
                  <TabsTrigger value="memorable">Memorable</TabsTrigger>
                </TabsList>
                <TabsContent value="random" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    {/* Length Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="length">Password Length</Label>
                        <span className="text-sm text-muted-foreground">{length[0]} characters</span>
                      </div>
                      <Slider id="length" min={8} max={64} step={1} value={length} onValueChange={handleLengthChange} />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="numbers" className="cursor-pointer">
                          Include Numbers
                        </Label>
                        <Switch id="numbers" checked={includeNumbers} onCheckedChange={handleNumberToggle} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="symbols" className="cursor-pointer">
                          Include Symbols
                        </Label>
                        <Switch id="symbols" checked={includeSymbols} onCheckedChange={handleSymbolToggle} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="memorable" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    {/* Length Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="length-memorable">Password Length</Label>
                        <span className="text-sm text-muted-foreground">{length[0]} characters</span>
                      </div>
                      <Slider id="length-memorable" min={8} max={64} step={1} value={length} onValueChange={handleLengthChange} />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="numbers-memorable" className="cursor-pointer">
                          Include Numbers
                        </Label>
                        <Switch id="numbers-memorable" checked={includeNumbers} onCheckedChange={handleNumberToggle} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="symbols-memorable" className="cursor-pointer">
                          Include Symbols
                        </Label>
                        <Switch id="symbols-memorable" checked={includeSymbols} onCheckedChange={handleSymbolToggle} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
