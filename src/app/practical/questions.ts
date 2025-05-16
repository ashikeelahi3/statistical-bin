// Sample question data structure for statistical practice questions
export interface CodeSnippets {
  python: string;
  r: string;
  cpp: string;
}

export interface Question {
  id: number;
  text: string;
  colabLink: string;
  codeSnippets: CodeSnippets;
}

// Sample questions array
export const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "Calculate the mean and standard deviation of the given dataset: $X = \\{1, 2, 3, 4, 5\\}$",
    colabLink: "https://colab.research.google.com/drive/1DOpDfqVIy9Bme4y7_ymjTD7fsGtFYOz5?usp=sharing",
    codeSnippets: {
      python: `import numpy as np

# Define the dataset
X = [1, 2, 3, 4, 5]

# Calculate mean and standard deviation
mean = np.mean(X)
std_dev = np.std(X)

print(f"Mean: {mean}")
print(f"Standard Deviation: {std_dev}")`,
      
      r: `# Define the dataset
X <- c(1, 2, 3, 4, 5)

# Calculate mean and standard deviation
mean_val <- mean(X)
std_dev <- sd(X)

cat("Mean:", mean_val, "\\n")
cat("Standard Deviation:", std_dev)`,
      
      cpp: `#include <iostream>
#include <vector>
#include <cmath>

int main() {
    std::vector<double> X = {1, 2, 3, 4, 5};
    double sum = 0.0;
    
    // Calculate mean
    for(double val : X) {
        sum += val;
    }
    double mean = sum / X.size();
    
    // Calculate standard deviation
    double sq_sum = 0.0;
    for(double val : X) {
        sq_sum += (val - mean) * (val - mean);
    }
    double std_dev = std::sqrt(sq_sum / X.size());
    
    std::cout << "Mean: " << mean << std::endl;
    std::cout << "Standard Deviation: " << std_dev << std::endl;
    
    return 0;
}`
    }
  },
  {
    id: 2,
    text: "Implement a function to perform a t-test where $H_0: \\mu = \\mu_0$ and $H_1: \\mu \\neq \\mu_0$.",
    colabLink: "https://colab.research.google.com/drive/1GQc-5fvfRM6uJgpSrK0VNfmrWEPhOXM8?usp=sharing",
    codeSnippets: {
      python: `import scipy.stats as stats
import numpy as np

def perform_ttest(data, mu0, alpha=0.05):
    # Perform one-sample t-test
    t_stat, p_value = stats.ttest_1samp(data, mu0)
    
    # Make a decision
    if p_value < alpha:
        decision = "Reject H0"
    else:
        decision = "Fail to reject H0"
    
    print(f"T-statistic: {t_stat}")
    print(f"P-value: {p_value}")
    print(f"Decision: {decision}")
    
# Example usage
data = np.array([5.2, 5.5, 6.0, 5.8, 5.7, 6.1, 5.9])
mu0 = 5.5  # Null hypothesis value
perform_ttest(data, mu0)`,
      
      r: `# Function to perform t-test
perform_ttest <- function(data, mu0, alpha = 0.05) {
  # Perform one-sample t-test
  result <- t.test(data, mu = mu0)
  
  # Make a decision
  decision <- ifelse(result$p.value < alpha, "Reject H0", "Fail to reject H0")
  
  # Print results
  cat("T-statistic:", result$statistic, "\\n")
  cat("P-value:", result$p.value, "\\n")
  cat("Decision:", decision, "\\n")
}

# Example usage
data <- c(5.2, 5.5, 6.0, 5.8, 5.7, 6.1, 5.9)
mu0 <- 5.5  # Null hypothesis value
perform_ttest(data, mu0)`,
      
      cpp: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

// Function to perform t-test
void perform_ttest(const std::vector<double>& data, double mu0, double alpha = 0.05) {
    // Calculate mean
    double sum = 0.0;
    for(double val : data) {
        sum += val;
    }
    double mean = sum / data.size();
    
    // Calculate standard deviation
    double sq_sum = 0.0;
    for(double val : data) {
        sq_sum += (val - mean) * (val - mean);
    }
    double std_dev = std::sqrt(sq_sum / (data.size() - 1));
    
    // Calculate t-statistic
    double t_stat = (mean - mu0) / (std_dev / std::sqrt(data.size()));
    
    // P-value calculation would typically require a library for the t-distribution
    // This is a simplified approximation for demonstration purposes
    std::cout << "T-statistic: " << t_stat << std::endl;
    std::cout << "Note: P-value calculation requires a statistical library" << std::endl;
}

int main() {
    std::vector<double> data = {5.2, 5.5, 6.0, 5.8, 5.7, 6.1, 5.9};
    double mu0 = 5.5;  // Null hypothesis value
    perform_ttest(data, mu0);
    
    return 0;
}`
    }
  }
];
