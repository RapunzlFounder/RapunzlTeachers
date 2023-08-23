export default function handleGradeColor(int) {
    // Handles If Score Is Between 90% and 100%
    if (int >= 90) {
        return '#23db98';
    }
    // Handles If Score Is Between 80% and 90%
    else if (int >= 80) {
        return '#0ecf8f';
    }
    // Handles If Score Is Between 70% and 80%
    else if (int >= 70) {
        return '#d1ca00';
    }
    // Handles If Score Is Between 60% and 70%
    else if (int >= 60) {
        return '#ffa200';
    }
    // Handles If Score Is Between 50% and 60%
    else if (int >= 50) {
        return '#ff3b29';
    }
    // Handles If Score Is Below 50%
    else {
        return '#ff3b29';
    }
  };
  