import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardContent } from "@mui/material";

// Función para obtener una cita aleatoria
// Función para obtener una cita aleatoria
const fetchQuote = async () => {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  return {
    content: data.slip.advice,
    author: "Anónimo",
  };
};

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });

  // Función para actualizar la cita
  const updateQuote = () => {
    fetchQuote().then((newQuote) => setQuote(newQuote));
  };

  // Actualiza la cita automáticamente cada 5 segundos
  useEffect(() => {
    updateQuote(); // Cargar una cita al iniciar
    const interval = setInterval(updateQuote, 5000); // Cada 5 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {quote.content}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          - {quote.author}
        </Typography>
        <Button variant="contained" onClick={updateQuote} sx={{ mt: 2 }}>
          Nueva Cita
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuoteGenerator;
