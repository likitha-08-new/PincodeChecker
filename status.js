document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const pincode = document.getElementById('pincode').value;
    
    if (pincode.length === 6) {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => response.json())
            .then(data => {
                const statusDiv = document.getElementById('delivery-status');
                statusDiv.innerHTML = ''; 
                
                if (data[0].Status === 'Success') {
                    const postOffices = data[0].PostOffice;
                    postOffices.forEach(postOffice => {
                        const deliveryStatus = postOffice.DeliveryStatus;
                        const postOfficeName = postOffice.Name;
                        const statusMessage = `Post Office: ${postOfficeName}, Delivery status: ${deliveryStatus}`;
                        const statusElement = document.createElement('p');
                        statusElement.textContent = statusMessage;
                        statusDiv.appendChild(statusElement);
                    });
                } else {
                    statusDiv.textContent = `Error: ${data[0].Message}`;
                }
            })
            .catch(error => {
                console.error('Error fetching delivery status:', error);
            });
    } else {
        alert('Please enter a valid 6-digit pincode.');
    }
});
