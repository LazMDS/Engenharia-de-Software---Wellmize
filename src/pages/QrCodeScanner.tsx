import { Camera, Moon, Sun} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import jsQR from "jsqr"; // Importa a biblioteca para leitura de QR Code

const QrCodeScanner = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, toggleTheme} = useTheme();
  const isDark = theme === "dark";
  const { toast } = useToast();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (stream) {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.onloadedmetadata = () => video.play();
      }
      setTimeout(() => scanQRCode(), 1000); // Aguarda um tempo para iniciar a leitura
    }
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setScanning(true);
      toast({
        title: "Câmera iniciada",
        description: "Posicione o QR Code no centro da tela",
      });
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setError("Não foi possível acessar a câmera. Por favor, verifique as permissões.");
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setScanning(false);
    }
  };

  const authenticateEntry = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const date = now.toLocaleDateString("pt-BR");

    toast({
      title: "Check-in realizado com sucesso!",
      description: `Check-in: ${time} - ${date}\nBom treino!`,
      className: "text-green-400",
    });
    navigate("/menu");
    stopCamera();
  };

  const scanQRCode = () => {
    if (!stream || !scanning) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scan = () => {
      if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
        requestAnimationFrame(scan);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        console.log("QR Code detectado:", code.data);
        authenticateEntry();
      } else {
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#1a1f2e]" : "bg-gray-50"}`}>
        {/* Header */}
        <nav className={`fixed top-0 w-full ${isDark ? 'bg-[#1e2538]' : 'bg-white'} shadow-md z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate("/menu")}> 
                        <Camera className="w-6 h-6 text-blue-500" />
                        <span className={`ml-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>QR-Code</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark ? "hover:bg-[#252b3b]" : "hover:bg-gray-100"}`}
                        >
                            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                        </button>
                        <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                </div>
            </div>
        </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
            Leitor de QR Code
          </h1>
          <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto mb-8`}>
            Escaneie o QR Code para realizar seu check-in na academia
          </p>
        </div>
        <div className="max-w-2xl mx-auto ">
          <div className={`p-6 rounded-lg shadow-lg ${isDark ? "bg-[#1e2538]" : "bg-white"}`}>
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md animate-fade-in">
                {error}
              </div>
            )}

            <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-4 animate-fade-in">
              {stream ? (
                <>
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                </>
              ) : (
                <div className="flex items-center justify-center h-full animate-fade-in">
                  <Camera className={`h-16 w-16 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                </div>
              )}
            </div>

            <div className="flex justify-center animate-fade-in">
              {!stream ? (
                <Button
                  onClick={startCamera}
                  className={`bg-primary text-white hover:bg-primary-hover ${isDark ? "hover:bg-primary-dark" : ""}`}
                >
                  Iniciar Camera
                </Button>
              ) : (
                <Button
                  onClick={stopCamera}
                  variant="destructive"
                  className={`${isDark ? "text-white" : ""}`}
                >
                  Parar Camera
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QrCodeScanner;
