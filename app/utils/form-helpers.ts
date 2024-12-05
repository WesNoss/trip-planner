export const handleFormSubmit = async (
    inputData: { origin: string; destination: string; startDate?: string; endDate?: string },
    onSuccess: (data: any) => void,
    onError: (error: string) => void
  ) => {
    console.log("Input data: ", inputData);
    
    try {
        const { origin, destination, startDate, endDate } = inputData;

        const formattedData = {
            origin: origin.trim().toUpperCase(),
            destination: destination.trim().toUpperCase(),
            startDate: startDate || undefined,
            endDate: endDate || undefined
        };

    const response = await fetch("/api/get-estimates", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch travel costs");
    }

    const data = await response.json();
    onSuccess(data);
    } catch (err: any) {
    onError(err.message || "Something went wrong");
    }
  };

